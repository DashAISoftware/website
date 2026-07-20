import institutionsData from './institutions-data.json' assert { type: 'json' };

// Languages published today in institutions.json. If the site adds support for
// a locale not listed here, resolveLocalized() falls back to English rather
// than breaking — but the source JSON should be updated to add it properly.
export type SupportedLang = 'en' | 'es' | 'pt' | 'de' | 'zh';

export type LocalizedText = Partial<Record<SupportedLang, string>> & { en: string };

export type Institution = {
  id: string;
  name: string;
  fullName?: string;
  role: LocalizedText;
  url: string;
  logo: string;
  small?: boolean;
};

export type FunderLogo = {
  id: string;
  name: string;
  fullName: string;
  url: string;
  logo: string;
};

export type Institutions = {
  institutions: Institution[];
  acknowledgments: {
    text: LocalizedText;
    grants?: string[];
    logos?: FunderLogo[];
  };
};

function resolveLocalized(text: LocalizedText | undefined, lang: string): string {
  return text?.[lang as SupportedLang] || text?.en || '';
}

export function getInstitutions(): Institution[] {
  const data = institutionsData as Institutions;
  return data.institutions || [];
}

export function getInstitutionRole(institution: Institution, lang: string): string {
  return resolveLocalized(institution.role, lang);
}

export function getAcknowledgmentsText(lang: string = 'en'): string {
  const data = institutionsData as Institutions;
  return resolveLocalized(data.acknowledgments?.text, lang);
}

export function getFunderLogos(): FunderLogo[] {
  const data = institutionsData as Institutions;
  return data.acknowledgments?.logos || [];
}

export function getGrants(): string[] {
  const data = institutionsData as Institutions;
  return data.acknowledgments?.grants || [];
}

export default institutionsData;

