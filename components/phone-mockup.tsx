import Image from "next/image";
import { felt } from "@/lib/felt";
import { cn } from "@/lib/utils";

type PhoneMockupProps = {
  src: string;
  alt: string;
  className?: string;
  /** Portrait screenshot fills the frame; icon centers the app icon without stretching */
  variant?: "screenshot" | "icon";
  /** contain keeps full screenshot visible inside rounded corners */
  fit?: "cover" | "contain";
};

export function PhoneMockup({
  src,
  alt,
  className,
  variant = "screenshot",
  fit = "contain",
}: PhoneMockupProps) {
  const isIcon = variant === "icon";

  return (
    <div className={cn("relative mx-auto w-full max-w-[200px] sm:max-w-[240px]", className)}>
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/15 to-accent-2/15 blur-2xl" />
      <div className="relative rounded-[2rem] border border-border bg-[#0d1118] p-2 shadow-2xl shadow-black/40 sm:p-2.5">
        <div
          className={cn(
            "relative aspect-[9/19.5] overflow-hidden rounded-[1.35rem] bg-[#f5f5f7]",
            isIcon ? "flex items-center justify-center bg-[#111620]" : "",
          )}
        >
          {isIcon ? (
            <>
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(circle at 50% 35%, rgba(79,123,255,0.35), transparent 65%)`,
                }}
              />
              <Image
                src={src}
                alt={alt}
                width={120}
                height={120}
                className="relative z-10 h-[38%] w-[38%] rounded-[22%] object-cover shadow-lg ring-1 ring-white/10"
              />
            </>
          ) : (
            <div className="absolute inset-[2px] overflow-hidden rounded-[1.25rem]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="240px"
                className={cn(
                  fit === "contain" ? "object-contain object-center" : "object-cover object-top",
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** iPhone mockup with transparent canvas — WebP keeps payload small while preserving alpha */
export function FeltHeroPhone({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[300px] sm:max-w-[340px]", className)}>
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <Image
        src={felt.heroPhone}
        alt="Felt app on iPhone"
        width={800}
        height={1421}
        sizes="(max-width: 640px) 300px, 340px"
        priority={priority}
        className="relative h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
      />
    </div>
  );
}
