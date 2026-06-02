import Link from "next/link";
import { legalLinks, siteConfig } from "@/lib/site";

export function Footer() {
  const { address, email, linkedIn, feltInstagram } = siteConfig;

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted">{siteConfig.descriptor}</p>
          <p className="mt-4 text-sm text-muted">
            {address.street}
            <br />
            {address.city}, {address.region} {address.postal}
            <br />
            {address.country}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-3 space-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Connect</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={`mailto:${email}`} className="hover:text-accent">
                {email}
              </a>
            </li>
            <li>
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={feltInstagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Felt on Instagram
              </a>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
