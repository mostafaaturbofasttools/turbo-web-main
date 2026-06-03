import { cn } from "@/lib/utils";

export function HorizontalScrollRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "-mx-4 flex gap-5 overflow-x-auto overscroll-x-contain px-4 pb-3 snap-x snap-mandatory scroll-smooth sm:-mx-6 sm:px-6",
        "[scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]",
        "[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function HorizontalScrollItem({
  children,
  className,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "narrow" | "default" | "wide";
}) {
  const widthClass =
    width === "narrow"
      ? "w-[min(85vw,240px)] sm:w-[260px]"
      : width === "wide"
        ? "w-[min(92vw,400px)] sm:w-[420px]"
        : "w-[min(88vw,320px)] sm:w-[340px]";

  return <div className={cn("shrink-0 snap-start", widthClass, className)}>{children}</div>;
}
