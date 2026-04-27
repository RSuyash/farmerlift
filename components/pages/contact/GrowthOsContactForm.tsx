"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = {
  name: string;
  phone: string;
  email: string;
  district: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  district: "",
  message: "",
  consent: true,
};

export function GrowthOsContactForm() {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
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
          ...formData,
          fullName: formData.name,
          formType: "contact",
          sourceCta: "FarmerLift Contact Form",
          sourcePage: window.location.href,
          utmSource: "farmerlift.in",
          utmMedium: "website",
          utmCampaign: "farmerlift_contact_form",
          businessData: {
            district: formData.district,
            enquiryType: "contact",
          },
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not submit enquiry.");
      }

      setIsSubmitted(true);
      setFormData(initialForm);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please call us directly.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center shadow-xl dark:border-emerald-900/40 dark:bg-emerald-950/30">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
        <h3 className="font-outfit text-2xl font-bold text-emerald-950 dark:text-emerald-100">
          Enquiry Received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-emerald-900/75 dark:text-emerald-100/70">
          Your details are now with the FarmerLift team. We will follow up on WhatsApp or phone after reviewing your requirement.
        </p>
        <Button
          type="button"
          className="mt-6 rounded-full bg-emerald-700 px-6 text-white hover:bg-emerald-800"
          onClick={() => setIsSubmitted(false)}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            required
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Amit Kumar"
            className="h-12 border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            WhatsApp / Phone <span className="text-red-500">*</span>
          </label>
          <Input
            required
            type="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+91 90000 00000"
            className="h-12 border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black/20"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="amit@example.com"
            className="h-12 border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black/20"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            District / Region
          </label>
          <Input
            value={formData.district}
            onChange={(event) => updateField("district", event.target.value)}
            placeholder="Nanded, Jalgaon, Nashik..."
            className="h-12 border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-black/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Your Requirements
        </label>
        <textarea
          required
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="flex min-h-[150px] w-full resize-y rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-black/20"
          placeholder="Tell us about products, dealership, supply, crop support, or order requirements..."
        />
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-950 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-100">
        <input
          type="checkbox"
          checked={formData.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-700"
        />
        <span>
          I agree to receive FarmerLift follow-ups over WhatsApp or phone about this enquiry.
        </span>
      </label>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 w-full rounded-full bg-emerald-700 px-8 font-semibold text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-800 md:w-auto"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message <MessageSquare className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
