import { LegalPage, generateLegalMetadata } from "@/components/legal-page";

export const metadata = generateLegalMetadata("imprint", "Imprint");

export default function Page() {
  return <LegalPage slug="imprint" />;
}
