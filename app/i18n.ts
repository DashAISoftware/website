import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import navbarEN from "../public/locales/en/navbar.json"
import navbarES from "../public/locales/es/navbar.json"
import navbarPT from "../public/locales/pt/navbar.json"

import homeEN from "../public/locales/en/home.json"
import homeES from "../public/locales/es/home.json"
import homePT from "../public/locales/pt/home.json"

import contributeEN from "../public/locales/en/contribute.json"
import contributeES from "../public/locales/es/contribute.json"
import contributePT from "../public/locales/pt/contribute.json"

import modelsEN from "../public/locales/en/models.json"
import modelsES from "../public/locales/es/models.json"
import modelsPT from "../public/locales/pt/models.json"

import downloadEN from "../public/locales/en/download.json"
import downloadES from "../public/locales/es/download.json"
import downloadPT from "../public/locales/pt/download.json"

import pluginsEN from "../public/locales/en/plugins.json"
import pluginsES from "../public/locales/es/plugins.json"
import pluginsPT from "../public/locales/pt/plugins.json"

import communityEN from "../public/locales/en/community.json"
import communityES from "../public/locales/es/community.json"
import communityPT from "../public/locales/pt/community.json"

import aboutEN from "../public/locales/en/about.json"
import aboutES from "../public/locales/es/about.json"
import aboutPT from "../public/locales/pt/about.json"

import footerEN from "../public/locales/en/footer.json"
import footerES from "../public/locales/es/footer.json"
import footerPT from "../public/locales/pt/footer.json"

i18n
  .use(initReactI18next)
  .init({
    lng: "es",
    resources: {
      es: {
        navbar: navbarES,
        home: homeES,
        contribute: contributeES,
        models: modelsES,
        download: downloadES,
        plugins: pluginsES,
        community: communityES,
        about: aboutES,
        footer: footerES,
      },
      en: {
        navbar: navbarEN,
        home: homeEN,
        contribute: contributeEN,
        models: modelsEN,
        download: downloadEN,
        plugins: pluginsEN,
        community: communityEN,
        about: aboutEN,
        footer: footerEN,
      },
      pt: {
        navbar: navbarPT,
        home: homePT,
        contribute: contributePT,
        models: modelsPT,
        download: downloadPT,
        plugins: pluginsPT,
        community: communityPT,
        about: aboutPT,
        footer: footerPT,
      },
    },
    supportedLngs: ["es", "en", "pt"],
    fallbackLng: "es",
    interpolation: { escapeValue: false },
  })

export default i18n
