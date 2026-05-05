import type { Metadata } from "next"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-foreground/50 text-sm mb-10">Last updated: January 2026</p>

        <div className="space-y-8 text-foreground/70 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Information We Collect</h2>
            <p>We collect information you provide when creating an account or placing an order — including name, email, phone number, and delivery address. We also collect usage data to improve our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To process and fulfill your orders</li>
              <li>To send order confirmations and updates</li>
              <li>To improve our products and services</li>
              <li>To send promotional emails (only if you have subscribed)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Data Security</h2>
            <p>Your data is stored securely using industry-standard encryption. We use Supabase for database management, which complies with GDPR and data protection regulations. We never sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Cookies</h2>
            <p>We use cookies to maintain your session and improve your browsing experience. You can disable cookies in your browser settings, though this may affect some features.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Your Rights</h2>
            <p>You have the right to access, update, or delete your personal data at any time. Contact us at hello@noorscents.com to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-3">Contact</h2>
            <p>For privacy concerns: <a href="mailto:hello@noorscents.com" className="text-primary hover:underline">hello@noorscents.com</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}