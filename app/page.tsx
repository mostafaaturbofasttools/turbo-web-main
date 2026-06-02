import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ButtonLink } from "@/components/ui/button";
import { GameCard, GameShowcaseRow, SectionHeading } from "@/components/game-card";
import { FeltHeroPhone } from "@/components/phone-mockup";
import { caseStudies, faqs, processSteps, services, whyTrbo } from "@/lib/content";
import { felt, feltReviews } from "@/lib/felt";
import { games, partnerShowcaseGames, primaryShowcaseGames } from "@/lib/games";
import { getBlogPosts } from "@/lib/content-loader";
import { siteConfig } from "@/lib/site";

const PublishFormSection = dynamic(
  () => import("@/components/publish-form-section").then((m) => ({ default: m.PublishFormSection })),
  { loading: () => <div className="min-h-[28rem] animate-pulse rounded-xl bg-surface/40" aria-hidden /> },
);

const FaqSection = dynamic(
  () => import("@/components/faq-section").then((m) => ({ default: m.FaqSection })),
  { loading: () => <div className="mt-10 min-h-64 animate-pulse rounded-xl bg-surface/40" aria-hidden /> },
);

export default function HomePage() {
  const posts = getBlogPosts().slice(0, 3);

  const formatBlogDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            email: siteConfig.email,
            description: siteConfig.descriptor,
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.address.street,
              addressLocality: siteConfig.address.city,
              addressRegion: siteConfig.address.region,
              postalCode: siteConfig.address.postal,
              addressCountry: siteConfig.address.country,
            },
          }),
        }}
      />

      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(79,123,255,0.13),transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            {siteConfig.name} · Est. 2021
          </p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-br from-foreground to-accent bg-clip-text text-transparent">
              {siteConfig.tagline}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{siteConfig.descriptor}</p>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted">
            We publish and grow apps with our internal platform, AI and human-in-the-loop workflows, and a mix of paid and organic distribution, on our own or with partners like Supercent, Voodoo, and Homa.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/publish" size="lg">
              Submit your app
            </ButtonLink>
            <ButtonLink href="#apps" variant="outline" size="lg">
              See our apps
            </ButtonLink>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {[
              { value: siteConfig.stats.downloads, label: "Downloads" },
              { value: siteConfig.stats.apps, label: "Apps" },
              { value: siteConfig.stats.rating, label: "Avg rating" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card px-4 py-6">
                <div className="text-2xl font-black sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/40 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">In collaboration with</p>
          <p className="max-w-xl text-sm text-muted">{siteConfig.partnerHighlight}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.partners.map((p, i) => (
              <span
                key={p}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  i < 2
                    ? "border-accent/40 bg-accent/10 text-foreground"
                    : "border-border bg-card text-muted"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="What we do" title="Publisher-first, growth-driven" description="From market insight to hybrid distribution, our internal platform and team help apps reach users and scale beyond typical publishing limits." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.number} className="rounded-2xl border border-border bg-card/60 p-6">
                <p className="text-xs font-bold text-accent">{s.number}</p>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="Process" title="How it works" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-border bg-card/50 p-5">
                <p className="text-sm font-bold text-accent">{step.step}</p>
                <h3 className="mt-2 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeading label="Why TRBO" title="A cleaner publishing model" description="We built our own platform so AI and human expertise work together and scale your product further than traditional publishing allows." />
          <ul className="mt-10 space-y-4">
            {whyTrbo.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-border bg-card/50 px-5 py-4 text-sm text-muted">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-gradient-to-br from-card via-background to-[#12102a] px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-accent-2">{felt.tagline}</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{felt.name}</h2>
            <p className="mt-2 text-sm text-accent">★ {felt.rating} · {felt.ratingsCount} ratings · {felt.category}</p>
            <p className="mt-4 text-muted">{felt.heroSubtitle}</p>
            <p className="mt-2 text-sm text-muted">{felt.heroQuote}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {felt.features.map((f) => (
                <span key={f} className="rounded-full border border-border bg-surface/80 px-3 py-1 text-xs">
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/felt">Learn more</ButtonLink>
              <ButtonLink href={felt.appStore} variant="outline">
                App Store
              </ButtonLink>
            </div>
          </div>
          <FeltHeroPhone priority={false} />
        </div>
      </section>

      <section id="apps" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-12">
          <SectionHeading
            label="Portfolio"
            title="Apps we publish & grow"
            description="Strategy, idle, and RPG titles built with Supercent, plus select partner collaborations."
          />
          <div className="space-y-6">
            {primaryShowcaseGames.map((game) => (
              <GameShowcaseRow key={game.slug} game={game} />
            ))}
          </div>
          <div className="border-t border-border pt-12">
            <SectionHeading label="Partner collaborations" title="Voodoo & Homa" description="Additional titles published through our publisher network." />
            <div className="mt-8 space-y-6">
              {partnerShowcaseGames.map((game) => (
                <GameShowcaseRow key={game.slug} game={game} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/20 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="All apps" title="More apps by TRBO" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="Track record" title="Proven results" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <a
                key={cs.name}
                href={cs.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-border bg-card/70 p-6 transition hover:border-accent/40"
              >
                <p className="text-xs font-bold uppercase text-accent">{cs.partner}</p>
                <h3 className="mt-2 text-xl font-bold">{cs.name}</h3>
                <p className="mt-2 text-sm text-muted">{cs.stat}</p>
                <p className="mt-1 text-sm font-medium">{cs.rating}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="Reviews" title="What users say about Felt" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {feltReviews.map((r) => (
              <blockquote key={r.author} className="rounded-2xl border border-border bg-card/60 p-6">
                <p className="text-sm text-accent">{"★".repeat(r.rating)}</p>
                <p className="mt-2 font-semibold">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                <footer className="mt-4 text-xs text-muted">{r.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeading label="Blog" title="Latest insights" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card/60 transition hover:border-accent/30"
              >
                <div className="relative aspect-[2/1] overflow-hidden bg-surface">
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted">
                    {formatBlogDate(post.date)} · {post.readingTime}
                  </p>
                  <h3 className="mt-2 text-lg font-bold group-hover:text-accent">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/blog" variant="outline">
              View all posts
            </ButtonLink>
          </div>
        </div>
      </section>

      <section id="publish" className="border-t border-border px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="Partner with us" title="Submit your app" description="Share your app, stage, and links. We review submissions, validate our bar, and invite accepted apps to a publisher test and publishing agreement." />
          <div className="mt-10 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
            <PublishFormSection />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/20 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <SectionHeading label="FAQ" title="Common questions" />
          <FaqSection />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}
