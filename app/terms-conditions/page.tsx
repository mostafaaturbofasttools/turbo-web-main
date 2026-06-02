import { LegalPage, generateLegalMetadata } from "@/components/legal-page";

export const metadata = generateLegalMetadata("terms-conditions", "Terms & Conditions");

export default function Page() {
  return <LegalPage slug="terms-conditions" />;
}
