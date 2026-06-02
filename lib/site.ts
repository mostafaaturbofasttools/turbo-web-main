export const siteConfig = {
  name: "TRBO FAST TOOLS INC",
  descriptor: "The AI-Powered App Publishing & Growth Agency",
  tagline: "We Build. Publish. Scale.",
  url: "https://www.turbofasttools.com",
  email: "info@turbofasttools.com",
  address: {
    street: "833 Homer St",
    city: "Vancouver",
    region: "BC",
    postal: "V6B 0H4",
    country: "Canada",
  },
  linkedIn: "https://ca.linkedin.com/company/trbo-fast-tools-inc",
  feltInstagram: "https://www.instagram.com/felt.app.trbo/",
  stats: {
    downloads: "2M+",
    apps: "16+",
    rating: "4.5",
  },
  partners: ["Supercent", "Voodoo", "Homa"] as const,
  partnerHighlight: "Our biggest hits are built with Supercent & Voodoo",
};

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#apps", label: "Apps" },
  { href: "/felt", label: "Felt" },
  { href: "/blog", label: "Blog" },
  { href: "/publish", label: "Submit App" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/terms-conditions", label: "Terms of Use" },
  { href: "/games-privacy-policy", label: "Games Privacy Policy" },
  { href: "/games-terms-conditions", label: "Games Terms of Use" },
  { href: "/imprint", label: "Imprint" },
] as const;
