export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="container-width max-w-4xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit text-emerald-950 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last Updated: January 1, 2026
          </p>
        </div>

        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to FarmerLift ("we," "us," or "our"). By accessing or using our website, mobile application, and services (collectively, the "Platform"), you agree to comply with and be bound by these Terms of Service ("Terms"). Please read them carefully. If you do not agree to these Terms, you may not use our Platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">2. Services Provided</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              FarmerLift relies on a digital marketplace model to connect farmers directly with manufacturers and authorized dealers of agricultural inputs. Our services include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Product catalog listing (Seeds, Fertilizers, Pesticides, Machinery).</li>
              <li>Facilitation of orders and logistics coordination.</li>
              <li>Provision of agricultural advisory content and knowledge.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To access certain features, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">4. Product Information & Pricing</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We strive to ensure accuracy in product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content on the Platform are accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Prices for products are subject to change without notice. We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              In no event shall FarmerLift, its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">6. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-white/10">
              <p className="font-semibold text-emerald-900 dark:text-emerald-100">FarmerLift Support</p>
              <p className="text-emerald-700 dark:text-emerald-300">support@farmerlift.in</p>
              <p className="text-emerald-700 dark:text-emerald-300">+91 98765-43210</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
