"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Sprout, Store, Truck, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "farmer",
    dob: "",
    gstNumber: "",
    city: "",
    state: "",
    address: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Real API Call
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://admin.farmerlift.in'}/wp-json/farmerlift/v1/submit-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      console.log("Registration Success:", result);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Please call us directly or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-emerald-50/50 flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center space-y-6 animate-in zoom-in-95 duration-300 border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold font-outfit text-emerald-950">Registration Received!</h2>
          <p className="text-gray-600 text-lg">
            Thank you for your interest in joining FarmerLift. Our team will verify your details and contact you at <strong>{formData.phone}</strong> within 24-48 hours.
          </p>
          <div className="pt-4">
            <Link href="/">
              <Button className="w-full h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-lg">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 bg-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-width relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-outfit mb-4">Partner With Us</h1>
          <p className="text-emerald-100/70 max-w-2xl mx-auto text-lg font-light">
            Join India's fastest growing digital agricultural network. reliable access to authentic inputs for Farmers, Dealers, and Distributors.
          </p>
        </div>
      </section>

      <div className="container-width -mt-10 relative z-20 pb-20">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">

          {/* Left Side - Context */}
          <div className="md:w-5/12 bg-emerald-50 dark:bg-emerald-900/10 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-6 font-outfit">Choose your Role</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center shrink-0 text-emerald-600">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">For Farmers</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Direct access to authentic products and expert consultancy.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center shrink-0 text-indigo-600">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">For Retailers</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bulk procurement prices and guaranteed supply chain.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center shrink-0 text-orange-600">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">For Distributors</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Expand your reach with our digital logistics network.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-sm text-emerald-800 dark:text-emerald-500 bg-emerald-100/50 dark:bg-emerald-900/30 p-4 rounded-xl">
              "FarmerLift has transformed how I source seeds. The quality guarantee is real."
              <div className="mt-2 font-bold">— Rajesh Patel, Gujarat</div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-7/12 p-8 md:p-10">
            <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mb-6">Registration Details</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name <span className="text-red-500">*</span></label>
                  <Input
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="h-11 bg-gray-50 dark:bg-black/20"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number <span className="text-red-500">*</span></label>
                  <Input
                    name="phone"
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="h-11 bg-gray-50 dark:bg-black/20"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 bg-gray-50 dark:bg-black/20"
                  onChange={handleChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date of Birth</label>
                  <Input
                    name="dob"
                    type="date"
                    className="h-11 bg-gray-50 dark:bg-black/20"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">GST Number (Optional)</label>
                  <Input
                    name="gstNumber"
                    placeholder="27AAAAA0000A1Z5"
                    className="h-11 bg-gray-50 dark:bg-black/20"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">City / Village <span className="text-red-500">*</span></label>
                  <Input
                    name="city"
                    required
                    placeholder="Enter city or village"
                    className="h-11 bg-gray-50 dark:bg-black/20"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">State / Region <span className="text-red-500">*</span></label>
                  <Input
                    name="state"
                    required
                    placeholder="e.g. Maharashtra"
                    className="h-11 bg-gray-50 dark:bg-black/20"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Address <span className="text-red-500">*</span></label>
                <Input
                  name="address"
                  required
                  placeholder="Street, Landmark, Pincode"
                  className="h-11 bg-gray-50 dark:bg-black/20"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Crops / Requirements</label>
                <textarea
                  name="message"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-gray-50 dark:bg-black/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us what you grow or what products you need stocking..."
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide rounded-xl shadow-lg shadow-emerald-700/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  By submitting, you agree to our <Link href="/privacy" className="underline hover:text-emerald-600">Privacy Policy</Link>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
