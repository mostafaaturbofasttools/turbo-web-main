export const siteConfig = {
  name: "TRBO FAST TOOLS INC",
  descriptor: "AI-native app publishing studio for consumer apps and games",
  tagline: "We build, publish, and scale AI-native consumer apps.",
  heroSubline:
    "We build apps, test growth with AI and paid UA, and publish on our own or with Supercent, Voodoo, and Homa.",
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
  founder: {
    name: "Mostafa Aminbeidokhti",
    title: "Founder & CEO",
    role: "AI Engineer at Microsoft | Distributed Systems, AI Infrastructure & Agents",
    linkedIn: "https://www.linkedin.com/in/mostafa-aminbeidokhti-150632122/",
  },
  stats: {
    downloads: "2M+",
    apps: "16+",
    rating: "4.5",
    revenue: "$1M+",
  },
  partners: ["Supercent", "Voodoo", "Homa"] as const,
  partnerHighlight: "Publisher network: Supercent, Voodoo, and Homa",
};

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#case-studies", label: "Results" },
  { href: "/#apps", label: "Apps" },
  { href: "/felt", label: "Felt" },
  { href: "/blog", label: "Blog" },
  { href: "/publish", label: "Submit App" },
  { href: "/contact", label: "Partner" },
] as const;

export const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/terms-conditions", label: "Terms of Use" },
  { href: "/games-privacy-policy", label: "Games Privacy Policy" },
  { href: "/games-terms-conditions", label: "Games Terms of Use" },
  { href: "/imprint", label: "Imprint" },
] as const;
