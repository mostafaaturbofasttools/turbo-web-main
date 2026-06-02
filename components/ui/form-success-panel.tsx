type FormSuccessPanelProps = {
  id?: string;
  title: string;
  description: string;
};

export function FormSuccessPanel({ id, title, description }: FormSuccessPanelProps) {
  return (
    <div
      id={id}
      data-submit-result
      className="flex min-h-[18rem] flex-col items-center justify-center px-4 py-8 text-center sm:min-h-[20rem]"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-gradient-to-br from-accent/15 to-accent-2/10 shadow-[0_0_32px_rgba(79,123,255,0.12)]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="mt-6 text-xl font-bold text-foreground sm:text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </div>
  );
}
