"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, PackageCheck, Store, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DealerForm = {
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  dealerType: string;
  district: string;
  taluka: string;
  village: string;
  state: string;
  pincode: string;
  monthlyVolume: string;
  productInterest: string;
  message: string;
  consent: boolean;
};

const initialForm: DealerForm = {
  businessName: "",
  contactPerson: "",
  phone: "",
  email: "",
  dealerType: "retailer",
  district: "",
  taluka: "",
  village: "",
  state: "Maharashtra",
  pincode: "",
  monthlyVolume: "",
  productInterest: "",
  message: "",
  consent: true,
};

export default function DealerEnquiryPage() {
  const [formData, setFormData] = useState<DealerForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = <Key extends keyof DealerForm>(key: Key, value: DealerForm[Key]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/naya-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: formData.contactPerson,
          fullName: formData.contactPerson,
          companyName: formData.businessName,
          phone: formData.phone,
          email: formData.email,
          message:
            formData.message ||
            `Dealer enquiry for ${formData.productInterest || "FarmerLift products"}`,
          formType: "dealer_enquiry",
          sourceCta: "FarmerLift Dealer / Order Enquiry",
          sourcePage: window.location.href,
          utmSource: "farmerlift.in",
          utmMedium: "website",
          utmCampaign: "farmerlift_dealer_enquiry",
          consent: formData.consent,
          dealerType: formData.dealerType,
          productInterest: formData.productInterest,
          orderIntent: formData.monthlyVolume,
          district: formData.district,
          taluka: formData.taluka,
          village: formData.village,
          state: formData.state,
          pincode: formData.pincode,
          businessData: {
            businessName: formData.businessName,
            dealerType: formData.dealerType,
            monthlyVolume: formData.monthlyVolume,
            productInterest: formData.productInterest,
            district: formData.district,
            taluka: formData.taluka,
            village: formData.village,
            state: formData.state,
            pincode: formData.pincode,
          },
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not submit dealer enquiry.");
      }

      setIsSubmitted(true);
      setFormData(initialForm);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please call FarmerLift directly.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-emerald-50/50 px-4 py-20">
        <section className="mx-auto max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl">
          <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-600" />
          <h1 className="font-outfit text-3xl font-bold text-emerald-950">
            Dealer Enquiry Received
          </h1>
          <p className="mt-3 text-gray-600">
            FarmerLift will review the region, products, and order potential, then follow up on WhatsApp or phone.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              type="button"
              className="rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800"
              onClick={() => setIsSubmitted(false)}
            >
              Submit another
            </Button>
            <Link href="/catalogue">
              <Button type="button" variant="outline" className="rounded-full px-6">
                Browse catalogue
              </Button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-emerald-950 px-4 py-20 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="container-width relative z-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">
              Dealer Network
            </p>
            <h1 className="mt-4 font-outfit text-4xl font-bold tracking-tight md:text-6xl">
              Build a FarmerLift supply lane for your district.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-100/75">
              Share your region, product demand, and order intent. FarmerLift can use this to qualify dealer partners, plan supply, and assign follow-up.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: Store, label: "Retailers", text: "Local shop and agri input stores" },
              { icon: Truck, label: "Distributors", text: "Regional supply and logistics partners" },
              { icon: PackageCheck, label: "Orders", text: "Bulk product and seasonal demand" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <item.icon className="h-6 w-6 text-emerald-300" />
                <p className="mt-3 font-bold">{item.label}</p>
                <p className="mt-1 text-sm text-emerald-100/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-width -mt-10 pb-20">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-5xl rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-950 md:p-10"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Business / Shop Name" required>
              <Input
                required
                value={formData.businessName}
                onChange={(event) => updateField("businessName", event.target.value)}
                placeholder="Shree Agro Center"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="Contact Person" required>
              <Input
                required
                value={formData.contactPerson}
                onChange={(event) => updateField("contactPerson", event.target.value)}
                placeholder="Owner / manager name"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="WhatsApp / Phone" required>
              <Input
                required
                type="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+91 98765 43210"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="owner@example.com"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="Partner Type">
              <select
                value={formData.dealerType}
                onChange={(event) => updateField("dealerType", event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-gray-50 px-3 text-sm dark:bg-black/20"
              >
                <option value="retailer">Retailer</option>
                <option value="dealer">Dealer</option>
                <option value="distributor">Distributor</option>
                <option value="bulk_buyer">Bulk Buyer</option>
              </select>
            </Field>
            <Field label="Monthly Order Potential">
              <Input
                value={formData.monthlyVolume}
                onChange={(event) => updateField("monthlyVolume", event.target.value)}
                placeholder="e.g. 50 cartons/month"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="Village / City" required>
              <Input
                required
                value={formData.village}
                onChange={(event) => updateField("village", event.target.value)}
                placeholder="Village or city"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="District" required>
              <Input
                required
                value={formData.district}
                onChange={(event) => updateField("district", event.target.value)}
                placeholder="Nanded, Jalgaon, Nashik..."
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="Taluka">
              <Input
                value={formData.taluka}
                onChange={(event) => updateField("taluka", event.target.value)}
                placeholder="Taluka"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="State">
              <Input
                value={formData.state}
                onChange={(event) => updateField("state", event.target.value)}
                placeholder="Maharashtra"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="Pincode">
              <Input
                value={formData.pincode}
                onChange={(event) => updateField("pincode", event.target.value)}
                inputMode="numeric"
                placeholder="431714"
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
            <Field label="Products Needed">
              <Input
                value={formData.productInterest}
                onChange={(event) => updateField("productInterest", event.target.value)}
                placeholder="Seeds, nutrients, crop support..."
                className="h-11 bg-gray-50 dark:bg-black/20"
              />
            </Field>
          </div>

          <div className="mt-5 space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Notes / Requirements
            </label>
            <textarea
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="min-h-[120px] w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm dark:bg-black/20"
              placeholder="Tell us about your region, crop focus, demand, or dealership expectations..."
            />
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-950 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-100">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-700"
            />
            <span>
              I agree to receive FarmerLift dealership, pricing, order, and product follow-ups on WhatsApp or phone.
            </span>
          </label>

          {error ? (
            <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-6 h-12 w-full rounded-xl bg-emerald-700 font-bold text-white hover:bg-emerald-800 md:w-auto md:px-10"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Dealer Enquiry"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {children}
    </div>
  );
}
