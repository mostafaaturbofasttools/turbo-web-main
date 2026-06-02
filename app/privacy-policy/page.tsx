import { LegalPage, generateLegalMetadata } from "@/components/legal-page";

export const metadata = generateLegalMetadata("privacy-policy", "Privacy Policy");

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
