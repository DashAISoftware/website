import institutionsData from './institutions-data.json' assert { type: 'json' };

export type Institution = {
  id: string;
  name: string;
  fullName?: string;
  role: string;
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
    text: {
      en: string;
      es: string;
      pt?: string;
    };
    grants?: string[];
    logos?: FunderLogo[];
  };
};

export function getInstitutions(): Institution[] {
  const data = institutionsData as Institutions;
  return data.institutions || [];
}

export function getAcknowledgmentsText(lang: 'en' | 'es' | 'pt' = 'en'): string {
  const data = institutionsData as Institutions;
  return (
    data.acknowledgments?.text?.[lang] ||
    data.acknowledgments?.text?.en ||
    ''
  );
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

