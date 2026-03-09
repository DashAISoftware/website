import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import supportedByEN from "../public/locales/en/supportedBy.json";
import supportedByES from "../public/locales/es/supportedBy.json";
import navbarEN from "../public/locales/en/navbar.json";
import navbarES from "../public/locales/es/navbar.json";
import heroEN from "../public/locales/en/hero.json";
import heroES from "../public/locales/es/hero.json";
import featuresEN from "../public/locales/en/features.json";
import featuresES from "../public/locales/es/features.json";
import downloadEN from "../public/locales/en/download.json";
import downloadES from "../public/locales/es/download.json";
import communityEN from "../public/locales/en/community.json";
import communityES from "../public/locales/es/community.json";
import contactEN from "../public/locales/en/contact.json";
import contactES from "../public/locales/es/contact.json";
import footerEN from "../public/locales/en/footer.json";
import footerES from "../public/locales/es/footer.json";


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        navbar: navbarEN,
        hero: heroEN,
        supportedBy: supportedByEN,
        features: featuresEN,
        download: downloadEN,
        community: communityEN,
        contact: contactEN,
        footer: footerEN,
      },
      es: {
        navbar: navbarES,
        hero: heroES,
        supportedBy: supportedByES,
        features: featuresES,
        download: downloadES,
        community: communityES,
        contact: contactES,
        footer: footerES,
      }
    },
    supportedLngs: ["en", "es"],
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;