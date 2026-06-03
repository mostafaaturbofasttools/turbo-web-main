import type { Game } from "@/lib/games";
import Image from "next/image";

function StoreBadge({
  href,
  label,
  gameName,
}: {
  href: string;
  label: string;
  gameName: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get ${gameName} on ${label}`}
      className="inline-flex items-center rounded-lg border border-border bg-surface/80 px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-accent/40"
    >
      {label}
    </a>
  );
}

export function PartnerBadge({ partner }: { partner: NonNullable<Game["partner"]> }) {
  return (
    <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
      With {partner}
    </span>
  );
}

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card/70 p-5 transition hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-black/20">
      <div className="flex items-start gap-4">
        <Image
          src={game.icon}
          alt={game.name}
          width={64}
          height={64}
          sizes="64px"
          quality={80}
          loading="lazy"
          className="rounded-xl shadow-lg"
        />
        <div className="min-w-0 flex-1">
          {game.partner ? <PartnerBadge partner={game.partner} /> : null}
          <h3 className="mt-1 truncate text-base font-bold">{game.name}</h3>
          <p className="text-xs uppercase tracking-wide text-accent">{game.genre}</p>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{game.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {game.appStore ? (
          <StoreBadge href={game.appStore} label="App Store" gameName={game.name} />
        ) : null}
        {game.playStore ? (
          <StoreBadge href={game.playStore} label="Google Play" gameName={game.name} />
        ) : null}
      </div>
    </article>
  );
}

export function GameShowcaseRow({ game }: { game: Game }) {
  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-border bg-card/50 p-6 sm:flex-row sm:items-start sm:p-8">
      <Image
        src={game.icon}
        alt={game.name}
        width={80}
        height={80}
        sizes="80px"
        quality={80}
        loading="lazy"
        className="shrink-0 rounded-2xl shadow-lg"
      />
      <div className="min-w-0 flex-1">
        {game.partner ? <PartnerBadge partner={game.partner} /> : null}
        <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{game.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-accent">{game.genre}</p>
        {game.stats ? <p className="mt-2 text-sm font-medium text-accent">{game.stats}</p> : null}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{game.blurb}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {game.appStore ? (
            <StoreBadge href={game.appStore} label="App Store" gameName={game.name} />
          ) : null}
          {game.playStore ? (
            <StoreBadge href={game.playStore} label="Google Play" gameName={game.name} />
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function SectionHeading({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {label ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{label}</p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-base text-muted">{description}</p> : null}
    </div>
  );
}
