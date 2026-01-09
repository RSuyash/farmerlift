import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">

      {/* 1. Hero / Header Section */}
      <section className="relative py-20 bg-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="container-width relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Contact Support</h1>
          <p className="text-emerald-100/70 max-w-xl mx-auto text-lg font-light">
            By The Farmer, For The Farmers. Reach out for any inquiries.
          </p>
        </div>
      </section>

      <div className="container-width -mt-12 relative z-20 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* 2. Contact Info Cards (Left Column) */}
          {/* Address Card & Map */}
          <div className="bg-white dark:bg-black/40 p-0 rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg overflow-hidden">
            <div className="p-8 pb-0">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-outfit">Headquarters</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                Plot No. A2, MIDC Industrial Area,<br />
                Kandhar, Dist. Nanded, Maharashtra – 431714
              </p>
            </div>
            {/* Google Maps Embed - Nanded Area Approx */}
            <div className="w-full h-48 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15125.244365737568!2d77.1983!3d18.8929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce89b03697920d%3A0xc3c5c93800c0f991!2sKandhar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704724000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Channels */}
          <div className="bg-white dark:bg-black/40 p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 font-outfit border-b border-gray-100 dark:border-white/5 pb-4">
              Direct Channels
            </h3>
            <div className="space-y-6">
              <a href="tel:+918788113105" className="flex items-start gap-4 group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 p-2 -mx-2 rounded-lg transition-colors">
                <Phone className="h-5 w-5 text-emerald-600 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Customer Care</p>
                  <p className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400">+91 87881 13105</p>
                </div>
              </a>
              <a href="mailto:farmerliftmanagement@gmail.com" className="flex items-start gap-4 group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 p-2 -mx-2 rounded-lg transition-colors">
                <Mail className="h-5 w-5 text-emerald-600 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Email Us</p>
                  <p className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-400 text-sm break-all">farmerliftmanagement@gmail.com</p>
                </div>
              </a>
              <div className="flex items-start gap-4 p-2 -mx-2">
                <Clock className="h-5 w-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Business Hours</p>
                  <p className="text-gray-700 dark:text-gray-200 font-medium">Mon - Sat: 9AM - 7PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Contact Form (Right Column - Wider) */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-white/5 p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl h-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white mb-2">Send us a Message</h2>
              <p className="text-gray-500 dark:text-gray-400">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                  <Input placeholder="Amit Kumar" className="bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                  <Input placeholder="+91 90000 00000" className="bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                <Input type="email" placeholder="amit@example.com" className="bg-gray-50 dark:bg-black/20 border-gray-200 dark:border-white/10 h-12" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Your Requirements</label>
                <textarea
                  className="flex min-h-[160px] w-full rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20 px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  placeholder="Tell us about the products you need or any questions you have..."
                />
              </div>

              <Button className="w-full md:w-auto h-12 px-8 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-semibold shadow-lg shadow-emerald-900/10">
                Send Message <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
