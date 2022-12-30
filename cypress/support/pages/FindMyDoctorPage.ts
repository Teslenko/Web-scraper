export default class FindMyDoctorPage {
  _selectors: {
    firstNameField: string;
    lastNameField: string;
    physicianNameRadioBtn: string;
    licenseNumberRadioBtn: string;
    citiesSpecialtiesRadioBtn: string;
    zipCodesRadioBtn: string;
    findPhysicianBtn: string;
    searchWrapper: string;
    licenseNumberField: string;
    licenseNumberTitle: string;
    licenseNumberCell: string;
    licenseTableResult: string;
    progressbar: string;
    alfordCityCheckbox: string;
  };

  constructor() {
    this._selectors = {
      firstNameField: "#physician-first-name-input",
      lastNameField: "#physician-last-name-input",
      physicianNameRadioBtn: "#mat-radio-2-input",
      licenseNumberRadioBtn: "#mat-radio-3-input",
      citiesSpecialtiesRadioBtn: "#mat-radio-4-input",
      zipCodesRadioBtn: "#mat-radio-5-input",
      findPhysicianBtn: ".search-button",
      searchWrapper: ".search-criteria-wrapper",
      licenseNumberField: "#physician-license-number-input",
      licenseNumberTitle: '[for="physician-license-number-input"]',
      licenseNumberCell: '[name="center"] [col-id="licenseNumber"] a',
      licenseTableResult: "#report-data-grid-ada",
      progressbar: '[role="progressbar"]',
      alfordCityCheckbox:
        '.cities-wrapper > .mat-selection-list > [data-index="4"] > .mat-list-item-content > .mat-pseudo-checkbox',
    };
  }

  getAlfordCityCheckbox() {
    return cy.get(this._selectors.alfordCityCheckbox);
  }

  getProgressbar() {
    return cy.get(this._selectors.progressbar);
  }

  getLicenseNumberCell() {
    return cy.get(this._selectors.licenseNumberCell);
  }

  getLicenseNumberTitle() {
    return cy.get(this._selectors.licenseNumberTitle);
  }

  getSearchWrapper() {
    return cy.get(this._selectors.searchWrapper);
  }

  getFirstNameField() {
    return cy.get(this._selectors.firstNameField);
  }

  getLastNameField() {
    return cy.get(this._selectors.lastNameField);
  }

  getLicenseNumberRadioBtn() {
    return cy.get(this._selectors.licenseNumberRadioBtn);
  }

  getCitiesSpecialtiesRadioBtn() {
    return cy.get(this._selectors.citiesSpecialtiesRadioBtn);
  }

  getZipCodesRadioBtn() {
    return cy.get(this._selectors.zipCodesRadioBtn);
  }

  getLicenseNumberField() {
    return cy.get(this._selectors.licenseNumberField);
  }

  getFindPhysicianBtn() {
    return cy.get(this._selectors.findPhysicianBtn);
  }

  clickCitiesSpecialtiesRadioBtn() {
    return this.getCitiesSpecialtiesRadioBtn().click({ force: true });
  }

  clickAlfordCityCheckbox() {
    return this.getAlfordCityCheckbox().click({ force: true });
  }

  clickLicenseNumberRadioBtn() {
    return this.getLicenseNumberRadioBtn().click({ force: true });
  }

  clickSubmitBtn() {
    return this.getFindPhysicianBtn().should("be.visible").click();
  }

  enterToLicenseNumberField(text) {
    return this.getLicenseNumberField().clear().type(text, { force: true });
  }

  enterToFirstNameField(text) {
    return this.getFirstNameField().clear().type(text);
  }

  enterToLastNameField(text) {
    return this.getLastNameField().clear().type(text);
  }

  enterLicenseNumberAndSubmit(licenseNumber) {
    this.clickLicenseNumberRadioBtn();
    this.getLicenseNumberTitle().should("be.visible");
    this.enterToLicenseNumberField(licenseNumber);
    this.clickSubmitBtn();
  }

  checkLicenseOnTable(licenseSelector) {
    this.getProgressbar().should("be.visible");
    this.getProgressbar().should("not.exist");
    cy.get("body").then(($body) => {
      // @ts-ignore
      if ($body.find(licenseSelector, { timeout: 10000 }).length > 0) {
        cy.log("Licenses Found");
      } else {
        cy.log("No Licenses Found");
        cy.writeFile(
          "cypress/output/_error_output_doctor_form_/_no_license_found.json",
          {
            NoLicenseFoundError: "NoLicenseFoundError",
          }
        ).then(() => {
          throw new Error("No Licenses Found");
        });
      }
    });
  }

  checkMultipleLicensesOnTable(licenseSelector) {
    this.getProgressbar().should("be.visible");
    this.getProgressbar().should("not.exist");
    cy.get("body").then(($body) => {
      // @ts-ignore
      if ($body.find(licenseSelector, { timeout: 10000 }).length > 0) {
        cy.log("Multiple Licenses Found");
      } else {
        cy.log("No Multiple Licenses Found");
        cy.writeFile(
          "cypress/output/_error_output_doctor_form_/_no_multiple_license_found.json",
          {
            MultipleLicensesFoundError: "MultipleLicensesFoundError",
          }
        ).then(() => {
          throw new Error("No Multiple Licenses Found");
        });
      }
    });
  }

  enterPhysicianNameAndLicenseNumberAndSubmit(status) {
    this.enterToFirstNameField(status.firstName);
    this.enterToLastNameField(status.lastName);
    this.enterLicenseNumberAndSubmit(status.licenseNumber);
  }

  removeTargetLinkFromSelector(selector) {
    cy.get(selector).invoke("removeAttr", "target").click();
  }
}
