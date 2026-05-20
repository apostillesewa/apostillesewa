import PL from "country-flag-icons/react/3x2/PL";
import DE from "country-flag-icons/react/3x2/DE";
import HR from "country-flag-icons/react/3x2/HR";
import MT from "country-flag-icons/react/3x2/MT";
import PT from "country-flag-icons/react/3x2/PT";
import CY from "country-flag-icons/react/3x2/CY";
import CZ from "country-flag-icons/react/3x2/CZ";

const MAP = { PL, DE, HR, MT, PT, CY, CZ } as const;

export type CountryCode = keyof typeof MAP;

export function Flag({
  code,
  className = "",
  title,
}: {
  code: CountryCode;
  className?: string;
  title?: string;
}) {
  const Component = MAP[code];
  return (
    <Component
      title={title ?? code}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
