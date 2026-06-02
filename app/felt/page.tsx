import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { FeltHeroPhone } from "@/components/phone-mockup";
import { felt } from "@/lib/felt";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Felt: AI Journal Buddy",
  description: felt.description,
  path: "/felt",
});

export default function FeltPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: felt.name,
            applicationCategory: "HealthApplication",
            operatingSystem: "iOS",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: felt.rating,
              ratingCount: felt.ratingsCount,
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(162,89,255,0.12),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Image
              src={felt.icon}
              alt={felt.name}
              width={88}
              height={88}
              sizes="88px"
              className="rounded-2xl shadow-xl"
            />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-accent-2">{felt.tagline}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{felt.heroTitle}</h1>
            <p className="mt-4 text-lg text-muted">{felt.heroSubtitle}</p>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">{felt.heroQuote}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={felt.appStore} size="lg">
                Download on the App Store
              </ButtonLink>
              <ButtonLink href={felt.instagram} variant="outline" size="lg">
                Instagram
              </ButtonLink>
            </div>
          </div>
          <FeltHeroPhone priority />
        </div>
      </section>

      {/* Journaling */}
      <section className="border-y border-border bg-surface/30 px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">{felt.journaling.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{felt.journaling.description}</p>
          </div>
          <Image
            src={felt.affirmationsImage}
            alt="Felt journaling"
            width={702}
            height={1018}
            sizes="(max-width: 1024px) 100vw, 384px"
            loading="lazy"
            className="mx-auto h-auto w-full max-w-sm drop-shadow-xl"
          />
        </div>
      </section>

      {/* Three pillars */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Why people journal with Felt</h2>
            <p className="mt-3 text-muted">
              Daily writing, growing self-awareness, and an AI buddy that learns you over time.
            </p>
          </div>
          <div className="grid grid-balance-md3 gap-8 md:grid-cols-3 [--grid-balance-gap:2rem]">
            {felt.highlights.map((h, i) => (
              <article key={h.title} className="rounded-2xl border border-border bg-card/60 p-6">
                <p className="text-sm font-bold text-accent">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-bold">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{h.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* App screens */}
      <section className="border-y border-border bg-gradient-to-b from-background to-[#12102a] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold">See Felt in action</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
            Daily journaling, mood tracking, and a buddy that gets more helpful the more you share.
          </p>
          <div className="mt-12 grid grid-balance-sm3 gap-6 sm:grid-cols-3">
            {felt.screenshots.map((shot) => (
              <div
                key={shot.src}
                className="overflow-hidden rounded-2xl border border-border bg-[#f5f5f7] p-2 shadow-lg"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={476}
                  height={738}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  loading="lazy"
                  className="h-auto w-full rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <Image
            src={felt.categoriesImage}
            alt="Felt categories"
            width={786}
            height={292}
            className="h-auto w-full rounded-xl border border-border"
          />
          <div>
            <h2 className="text-3xl font-bold">{felt.categories.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{felt.categories.description}</p>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="border-t border-border bg-surface/20 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">{felt.themes.title}</h2>
            <p className="mt-4 text-lg text-muted">{felt.themes.description}</p>
          </div>
          <div className="mt-10 grid grid-balance-2 gap-6 sm:grid-cols-2 [--grid-balance-gap:1.5rem]">
            {felt.themes.images.map((src) => (
              <Image
                key={src}
                src={src}
                alt="Felt theme designs"
                width={786}
                height={738}
                className="h-auto w-full rounded-xl border border-border bg-card/40"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Illustration + CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <Image
            src={felt.heroIllustration}
            alt="Felt wellness illustration"
            width={782}
            height={856}
            className="mx-auto h-auto w-full max-w-md"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Start journaling today</h2>
            <p className="mt-4 text-muted">{felt.description}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {felt.features.map((f) => (
                <span key={f} className="rounded-full border border-border bg-surface/80 px-3 py-1 text-xs">
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <ButtonLink href={felt.appStore} size="lg">
                Get Felt on the App Store
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted">
              ★ {felt.rating} · {felt.ratingsCount} App Store ratings
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t border-border bg-surface/30 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold">Privacy-first by design</h2>
          <p className="mt-3 text-sm text-muted">
            Your data is encrypted and stored securely. Felt is a self-care tool, not a replacement for clinical
            mental health treatment.
          </p>
          <p className="mt-4 text-sm text-muted">
            <a href="/privacy-policy" className="text-accent underline">
              Privacy Policy
            </a>
            {" · "}
            <a href="/terms-conditions" className="text-accent underline">
              Terms of Use
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
