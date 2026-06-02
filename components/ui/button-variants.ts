import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-accent-2 to-accent text-white shadow-lg shadow-accent-2/30 hover:opacity-90",
        outline: "border border-border bg-surface/50 text-foreground hover:border-accent/40 hover:bg-surface",
        ghost: "text-muted hover:text-foreground hover:bg-surface/80",
        secondary: "bg-surface text-foreground border border-border hover:border-accent/30",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
