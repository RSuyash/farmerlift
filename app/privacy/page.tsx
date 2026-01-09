
export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen py-16 md:py-24">
      <div className="container-width max-w-4xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit text-emerald-950 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last Updated: January 8, 2026
          </p>
        </div>

        <div className="prose prose-emerald dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At FarmerLift, we value the trust you place in us. This Privacy Policy describes how we collect, use, and share information when you use our website and services. By using FarmerLift, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>Personal Information:</strong> Name, address, phone number, and email address provided during registration or checkout.</li>
              <li><strong>Location Data:</strong> Used to facilitate accurate delivery and connect you with local partners.</li>
              <li><strong>Usage Data:</strong> Information on how you access and use the platform, including device type and browser version.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mt-4">
              <li>Process and fulfill your orders.</li>
              <li>Communicate with you regarding updates, offers, and support.</li>
              <li>Improve platform functionality and user experience.</li>
              <li>Prevent fraud and ensure platform security.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">4. Data Sharing & Security</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We respect your privacy and do not sell your personal data. We may share data with trusted third-party service providers (like logistics partners) solely for the purpose of fulfilling services. We implement industry-standard security measures to protect your data from unauthorized access.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold font-outfit text-emerald-900 dark:text-emerald-100 mb-4">5. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about our Privacy Policy, please contact us:
            </p>
            <div className="mt-4 p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-white/10">
              <p className="font-semibold text-emerald-900 dark:text-emerald-100">FarmerLift Privacy Team</p>
              <p className="text-emerald-700 dark:text-emerald-300">farmerliftmanagement@gmail.com</p>
              <p className="text-emerald-700 dark:text-emerald-300">+91 87881-13105</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
