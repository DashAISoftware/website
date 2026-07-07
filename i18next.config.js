const { defineConfig } = require("i18next-cli")

/** @type {import('i18next-cli').I18nextToolkitConfig} */
module.exports = defineConfig({
  locales: ["es", "en", "pt", "de"],
  extract: {
    input: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    output: "public/locales/{{language}}/{{namespace}}.json",
    keySeparator: false,
    nsSeparator: ":",
  },
})
