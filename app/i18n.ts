import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import navbarEN from "../public/locales/en/navbar.json"
import navbarES from "../public/locales/es/navbar.json"
import navbarPT from "../public/locales/pt/navbar.json"
import navbarDE from "../public/locales/de/navbar.json"
import navbarZH from "../public/locales/zh/navbar.json"

import homeEN from "../public/locales/en/home.json"
import homeES from "../public/locales/es/home.json"
import homePT from "../public/locales/pt/home.json"
import homeDE from "../public/locales/de/home.json"
import homeZH from "../public/locales/zh/home.json"

import contributeEN from "../public/locales/en/contribute.json"
import contributeES from "../public/locales/es/contribute.json"
import contributePT from "../public/locales/pt/contribute.json"
import contributeDE from "../public/locales/de/contribute.json"
import contributeZH from "../public/locales/zh/contribute.json"

import modelsEN from "../public/locales/en/models.json"
import modelsES from "../public/locales/es/models.json"
import modelsPT from "../public/locales/pt/models.json"
import modelsDE from "../public/locales/de/models.json"
import modelsZH from "../public/locales/zh/models.json"

import downloadEN from "../public/locales/en/download.json"
import downloadES from "../public/locales/es/download.json"
import downloadPT from "../public/locales/pt/download.json"
import downloadDE from "../public/locales/de/download.json"
import downloadZH from "../public/locales/zh/download.json"

import pluginsEN from "../public/locales/en/plugins.json"
import pluginsES from "../public/locales/es/plugins.json"
import pluginsPT from "../public/locales/pt/plugins.json"
import pluginsDE from "../public/locales/de/plugins.json"
import pluginsZH from "../public/locales/zh/plugins.json"

import communityEN from "../public/locales/en/community.json"
import communityES from "../public/locales/es/community.json"
import communityPT from "../public/locales/pt/community.json"
import communityDE from "../public/locales/de/community.json"
import communityZH from "../public/locales/zh/community.json"

import aboutEN from "../public/locales/en/about.json"
import aboutES from "../public/locales/es/about.json"
import aboutPT from "../public/locales/pt/about.json"
import aboutDE from "../public/locales/de/about.json"
import aboutZH from "../public/locales/zh/about.json"

import footerEN from "../public/locales/en/footer.json"
import footerES from "../public/locales/es/footer.json"
import footerPT from "../public/locales/pt/footer.json"
import footerDE from "../public/locales/de/footer.json"
import footerZH from "../public/locales/zh/footer.json"

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
      de: {
        navbar: navbarDE,
        home: homeDE,
        contribute: contributeDE,
        models: modelsDE,
        download: downloadDE,
        plugins: pluginsDE,
        community: communityDE,
        about: aboutDE,
        footer: footerDE,
      },
      zh: {
        navbar: navbarZH,
        home: homeZH,
        contribute: contributeZH,
        models: modelsZH,
        download: downloadZH,
        plugins: pluginsZH,
        community: communityZH,
        about: aboutZH,
        footer: footerZH,
      },
    },
    supportedLngs: ["es", "en", "pt", "de", "zh"],
    fallbackLng: "es",
    interpolation: { escapeValue: false },
  })

export default i18n
