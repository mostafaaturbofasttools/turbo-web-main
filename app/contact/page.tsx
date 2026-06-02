import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: `Contact ${siteConfig.name} in Vancouver, BC. Email ${siteConfig.email} for publishing and partnership inquiries.`,
  path: "/contact",
});

export default function ContactPage() {
  const { address, email } = siteConfig;

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">Contact us</h1>
          <p className="mt-4 text-muted">We would love to hear about your app or partnership idea.</p>
          <div className="mt-8 space-y-4 text-sm text-muted">
            <p>
              <span className="font-semibold text-foreground">Email</span>
              <br />
              <a href={`mailto:${email}`} className="text-accent">
                {email}
              </a>
            </p>
            <p>
              <span className="font-semibold text-foreground">Office</span>
              <br />
              {address.street}
              <br />
              {address.city}, {address.region} {address.postal}
              <br />
              {address.country}
            </p>
            <p>
              <a href={siteConfig.linkedIn} target="_blank" rel="noopener noreferrer" className="text-accent">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
