import { LegalPage, generateLegalMetadata } from "@/components/legal-page";

export const metadata = generateLegalMetadata("games-privacy-policy", "Games Privacy Policy");

export default function Page() {
  return <LegalPage slug="games-privacy-policy" />;
}
