import { Link } from "@tanstack/react-router";

type Props = {
  className?: string;
  withWordmark?: boolean;
};

/**
 * Official Apostille Sewa brand mark.
 * Renders inline SVG so the logo is crisp at any DPR and themable via CSS.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Apostille Sewa"
      className={className}
    >
      <path
        d="M40 5C18 5 10 15 10 38C10 65 22 75 40 75C58 75 70 65 70 38C70 15 62 5 40 5Z"
        stroke="hsl(217 91% 53%)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M25 50C25 32 32 24 40 24C48 24 55 32 55 42C55 52 48 56 40 56C30 56 25 62 25 70"
        stroke="hsl(160 84% 39%)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="40" cy="38" r="4" fill="hsl(217 91% 53%)" />
    </svg>
  );
}

export function Logo({ className = "", withWordmark = true }: Props) {
  return (
    <Link
      to="/"
      className={`group inline-flex shrink-0 items-center gap-2.5 ${className}`}
      aria-label="Apostille Sewa — Home"
    >
      <LogoMark className="h-9 w-9 transition-transform group-hover:scale-[1.04]" />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-[1.05rem] font-extrabold tracking-tight text-foreground">
            Apostille<span className="font-normal text-primary"> Sewa</span>
          </span>
          <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:block">
            Document Legalization
          </span>
        </span>
      )}
    </Link>
  );
}
