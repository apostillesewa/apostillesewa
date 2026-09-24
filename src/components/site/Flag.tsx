import AT from "country-flag-icons/react/3x2/AT";
import BE from "country-flag-icons/react/3x2/BE";
import BG from "country-flag-icons/react/3x2/BG";
import CH from "country-flag-icons/react/3x2/CH";
import CY from "country-flag-icons/react/3x2/CY";
import CZ from "country-flag-icons/react/3x2/CZ";
import DE from "country-flag-icons/react/3x2/DE";
import DK from "country-flag-icons/react/3x2/DK";
import EE from "country-flag-icons/react/3x2/EE";
import ES from "country-flag-icons/react/3x2/ES";
import FI from "country-flag-icons/react/3x2/FI";
import FR from "country-flag-icons/react/3x2/FR";
import GB from "country-flag-icons/react/3x2/GB";
import GR from "country-flag-icons/react/3x2/GR";
import HR from "country-flag-icons/react/3x2/HR";
import HU from "country-flag-icons/react/3x2/HU";
import IE from "country-flag-icons/react/3x2/IE";
import IS from "country-flag-icons/react/3x2/IS";
import IT from "country-flag-icons/react/3x2/IT";
import LI from "country-flag-icons/react/3x2/LI";
import LT from "country-flag-icons/react/3x2/LT";
import LU from "country-flag-icons/react/3x2/LU";
import LV from "country-flag-icons/react/3x2/LV";
import MT from "country-flag-icons/react/3x2/MT";
import NL from "country-flag-icons/react/3x2/NL";
import NO from "country-flag-icons/react/3x2/NO";
import PL from "country-flag-icons/react/3x2/PL";
import PT from "country-flag-icons/react/3x2/PT";
import RO from "country-flag-icons/react/3x2/RO";
import SE from "country-flag-icons/react/3x2/SE";
import SI from "country-flag-icons/react/3x2/SI";
import SK from "country-flag-icons/react/3x2/SK";

const MAP = {
  AT, BE, BG, CH, CY, CZ, DE, DK, EE, ES, FI, FR, GB, GR, HR, HU,
  IE, IS, IT, LI, LT, LU, LV, MT, NL, NO, PL, PT, RO, SE, SI, SK,
} as const;

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
  if (!Component) return null;
  return (
    <Component
      title={title ?? code}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}
