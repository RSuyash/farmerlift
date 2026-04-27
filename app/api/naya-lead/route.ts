import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadRequestBody = Record<string, unknown>;

const DEFAULT_WORDPRESS_URL = "https://admin.farmerlift.in";

function readString(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return "";
}

function readBoolean(value: unknown, fallback = true) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["false", "0", "no", "off"].includes(normalized)) {
      return false;
    }
    if (["true", "1", "yes", "on"].includes(normalized)) {
      return true;
    }
  }
  return fallback;
}

function normalizePhone(value: string) {
  const cleaned = value.replace(/[^\d+]/g, "");
  if (!cleaned) {
    return "";
  }
  if (cleaned.startsWith("+")) {
    return cleaned;
  }
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  return cleaned;
}

function safeObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function pickBusinessData(body: LeadRequestBody) {
  const businessData = safeObject(body.businessData);
  return {
    formType: readString(body.formType),
    role: readString(body.type || body.role),
    dealerType: readString(body.dealerType || body.type),
    orderIntent: readString(body.orderIntent),
    productInterest: readString(body.productInterest),
    cropInterest: readString(body.cropInterest || body.message),
    district: readString(body.district),
    taluka: readString(body.taluka),
    village: readString(body.village || body.city),
    city: readString(body.city),
    state: readString(body.state),
    pincode: readString(body.pincode),
    address: readString(body.address),
    gstNumber: readString(body.gstNumber),
    dob: readString(body.dob),
    ...businessData,
  };
}

function buildGrowthPayload(body: LeadRequestBody, request: NextRequest) {
  const now = new Date();
  const formType = readString(body.formType) || "website_form";
  const fullName = readString(body.fullName || body.name);
  const phone = normalizePhone(readString(body.phone || body.mobile || body.whatsapp));
  const email = readString(body.email);
  const sourcePage =
    readString(body.sourcePage) ||
    request.headers.get("referer") ||
    "https://farmerlift.in";
  const sourceCta =
    readString(body.sourceCta) ||
    (formType === "registration"
      ? "FarmerLift Partner Registration"
      : formType === "dealer_enquiry"
        ? "FarmerLift Dealer Enquiry"
        : "FarmerLift Website Enquiry");
  const externalLeadId =
    readString(body.externalLeadId) ||
    `farmerlift-${formType}-${now.getTime()}`;
  const businessData = pickBusinessData(body);

  return {
    name: fullName,
    fullName,
    phone,
    email,
    message: readString(body.message || body.requirements || body.notes),
    consent: readBoolean(body.consent, true),
    sourcePage,
    sourceCta,
    utmSource: readString(body.utmSource) || "farmerlift.in",
    utmMedium: readString(body.utmMedium) || "website",
    utmCampaign: readString(body.utmCampaign) || "farmerlift_v03_live_test",
    externalLeadId,
    externalFormId: formType,
    capturedAt: now.toISOString(),
    formType,
    businessData,
    district: businessData.district,
    taluka: businessData.taluka,
    village: businessData.village,
    city: businessData.city,
    state: businessData.state,
    pincode: businessData.pincode,
    address: businessData.address,
    gstNumber: businessData.gstNumber,
    dealerType: businessData.dealerType,
    orderIntent: businessData.orderIntent,
    productInterest: businessData.productInterest,
    cropInterest: businessData.cropInterest,
  };
}

async function postJson(url: string, body: unknown, headers?: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text.slice(0, 500) };
    }
  }

  if (!response.ok) {
    throw new Error(
      typeof data === "object" && data && "message" in data
        ? String((data as { message?: unknown }).message)
        : `Request failed with ${response.status}`,
    );
  }

  return data;
}

export async function POST(request: NextRequest) {
  let body: LeadRequestBody;
  try {
    body = (await request.json()) as LeadRequestBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const formType = readString(body.formType) || "website_form";
  const fullName = readString(body.fullName || body.name);
  const phone = normalizePhone(readString(body.phone || body.mobile || body.whatsapp));

  if (!fullName || !phone) {
    return NextResponse.json(
      { success: false, message: "Name and phone are required." },
      { status: 400 },
    );
  }

  const growthPayload = buildGrowthPayload(body, request);
  const intakeUrl = process.env.NAYA_GROWTH_INTAKE_URL;
  const intakeSecret = process.env.NAYA_GROWTH_INTAKE_SECRET;
  const wordpressBase =
    process.env.WORDPRESS_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    DEFAULT_WORDPRESS_URL;

  const result: {
    success: boolean;
    growthos?: unknown;
    wordpress?: unknown;
    warnings: string[];
  } = {
    success: false,
    warnings: [],
  };

  if (intakeUrl && intakeSecret) {
    try {
      result.growthos = await postJson(intakeUrl, growthPayload, {
        "x-naya-intake-secret": intakeSecret,
        "x-naya-idempotency-key": String(growthPayload.externalLeadId),
      });
    } catch (error) {
      result.warnings.push(
        `GrowthOS intake failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  } else {
    result.warnings.push("GrowthOS intake is not configured on this server.");
  }

  if (formType === "registration") {
    try {
      result.wordpress = await postJson(
        `${wordpressBase.replace(/\/$/, "")}/wp-json/farmerlift/v1/submit-registration`,
        {
          ...body,
          phone,
          name: fullName,
        },
      );
    } catch (error) {
      result.warnings.push(
        `WordPress registration mirror failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  result.success = Boolean(result.growthos || result.wordpress);

  if (!result.success) {
    return NextResponse.json(
      {
        ...result,
        message: "We could not submit your enquiry. Please call FarmerLift directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ...result,
    message: "Enquiry received.",
  });
}
