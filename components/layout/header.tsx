import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { navLinks } from "@/lib/site";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-icon.svg" alt="TRBO" width={36} height={36} priority />
          <div className="hidden sm:block">
            <div className="text-sm font-bold tracking-tight">TRBO</div>
            <div className="text-[11px] text-muted">Publishing & Growth</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/publish" size="sm">
            Submit App
          </ButtonLink>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
