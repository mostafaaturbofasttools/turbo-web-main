import { LegalPage, generateLegalMetadata } from "@/components/legal-page";

export const metadata = generateLegalMetadata("games-terms-conditions", "Games Terms & Conditions");

export default function Page() {
  return <LegalPage slug="games-terms-conditions" />;
}
