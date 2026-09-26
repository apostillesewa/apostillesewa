import type { CountryCode } from "@/components/site/Flag";
import { listPublishedPostsBundled } from "./blog-bundled";

export type Country = {
  slug: string;
  name: string;
  code: CountryCode;
  region: "Schengen" | "EU (non-Schengen)" | "Non-EU";
  note: string;
  /** Words matched against article slugs to find related guides. */
  keywords: string[];
  featured?: boolean;
};

// Only countries we actively serve and have written guidance for.
// Notes summarise what our published guides already cover.
export const COUNTRIES: Country[] = [
  { slug: "poland", code: "PL", name: "Poland", region: "Schengen", featured: true, keywords: ["poland"], note: "Required for: Work Permits & National Visas. Includes: Full MOFA + Embassy Stamping." },
  { slug: "germany", code: "DE", name: "Germany", region: "Schengen", featured: true, keywords: ["germany"], note: "Required for: Student & Blue Card Visas. Includes: MOFA + Anabin recognition guidance." },
  { slug: "croatia", code: "HR", name: "Croatia", region: "Schengen", featured: true, keywords: ["croatia"], note: "Required for: Seasonal & Work Permits. Includes: Full MOFA + Embassy Stamping." },
  { slug: "malta", code: "MT", name: "Malta", region: "Schengen", featured: true, keywords: ["malta"], note: "Required for: Single Permit Applications. Includes: MOFA + Apostille verification." },
  { slug: "portugal", code: "PT", name: "Portugal", region: "Schengen", featured: true, keywords: ["portugal"], note: "Required for: Job-Seeker & D7 Visas. Includes: MOFA + Apostille for SEF." },
  { slug: "cyprus", code: "CY", name: "Cyprus", region: "EU (non-Schengen)", featured: true, keywords: ["cyprus"], note: "Required for: Work & Student Permits. Includes: Full MOFA + Embassy Stamping." },
  { slug: "austria", code: "AT", name: "Austria", region: "Schengen", keywords: ["austria"], note: "Document legalization for Red-White-Red Card and work applications." },
  { slug: "belgium", code: "BE", name: "Belgium", region: "Schengen", keywords: ["belgium"], note: "Document legalization for Belgian visa applications." },
  { slug: "bulgaria", code: "BG", name: "Bulgaria", region: "Schengen", keywords: ["bulgaria", "bulgarian"], note: "PCC and SLC legalization for Bulgarian work visas." },
  { slug: "czech-republic", code: "CZ", name: "Czech Republic", region: "Schengen", keywords: ["czech"], note: "Document superlegalization for Czech visa applications." },
  { slug: "denmark", code: "DK", name: "Denmark", region: "Schengen", keywords: ["denmark"], note: "Document legalization for SIRI visa applications." },
  { slug: "italy", code: "IT", name: "Italy", region: "Schengen", keywords: ["italy"], note: "Legalization and DOV support for study and scholarship applications." },
  { slug: "lithuania", code: "LT", name: "Lithuania", region: "Schengen", keywords: ["lithuania"], note: "PCC legalization for Lithuanian applications." },
  { slug: "romania", code: "RO", name: "Romania", region: "Schengen", keywords: ["romania"], note: "Legalization for Romanian work permits and study visas." },
  { slug: "slovenia", code: "SI", name: "Slovenia", region: "Schengen", keywords: ["slovenia"], note: "PCC and passport legalization via the Embassy of Slovenia, New Delhi." },
  { slug: "spain", code: "ES", name: "Spain", region: "Schengen", keywords: ["spain"], note: "Document and PCC legalization for Spanish visa applications." },
  { slug: "ireland", code: "IE", name: "Ireland", region: "EU (non-Schengen)", keywords: ["ireland"], note: "Document legalization via the embassy in Delhi for Irish applications." },
  { slug: "united-kingdom", code: "GB", name: "United Kingdom", region: "Non-EU", keywords: ["uk-"], note: "Document attestation and translation for UK visa applications." },
];

export function getCountry(slug: string) {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function relatedPostsFor(country: Country, limit = 6) {
  return listPublishedPostsBundled()
    .filter((p) => country.keywords.some((k) => p.slug.includes(k)))
    .slice(0, limit);
}
