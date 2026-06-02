import type { Metadata } from "next";
import { PublishForm } from "@/components/forms/publish-form";
import { SectionHeading } from "@/components/game-card";

export const metadata: Metadata = {
  title: "Submit Your App",
  description: "Apply to partner with TRBO. Share your app, stage, and links. We review every submission for publishing and growth.",
};

export default function PublishPage() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Submit your app"
          description="Share your app, stage, and links. We review every submission, validate our bar, and invite strong fits to a publisher test and publishing agreement."
        />
        <div className="mt-10 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <PublishForm />
        </div>
      </div>
    </section>
  );
}
