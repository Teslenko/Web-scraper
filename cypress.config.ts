import { defineConfig } from "cypress";
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      addMatchImageSnapshotPlugin(on, config);
    },
    defaultCommandTimeout: 40000,
    execTimeout: 3000,
    taskTimeout: 3000,
    pageLoadTimeout: 60000,
    requestTimeout: 3000,
    responseTimeout: 3000,
    chromeWebSecurity: false,
    screenshotsFolder: "cypress/output",
    trashAssetsBeforeRuns: true,
    env: {
      ENV: "https://findmydoctor.mass.gov/",
      failSilently: false,
    },
  },
});
