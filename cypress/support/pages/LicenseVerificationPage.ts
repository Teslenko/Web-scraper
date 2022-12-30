import * as dayjs from "dayjs";

export default class LicenseVerificationPage {
  _selectors: {
    viewContainer: string;
    licenseExpirationDate: string;
    licenseStatus: string;
    licenseNumber: string;
    licenseName: string;
  };

  constructor() {
    this._selectors = {
      viewContainer: "#view-container",
      licenseExpirationDate: ":nth-child(9) > .profile-section-value",
      licenseName:
        ".top-container-left > :nth-child(1) > .profile-section-value",
      licenseNumber:
        ".top-container-left > :nth-child(4) > .profile-section-value",
      licenseStatus:
        ".top-container-left > :nth-child(5) > .profile-section-value",
    };
  }

  getViewContainer() {
    return cy.get(this._selectors.viewContainer);
  }

  getLicenseExpirationDate() {
    return cy.get(this._selectors.licenseExpirationDate);
  }

  getTextLicenseExpirationDate() {
    const license = { text: toString() };
    this.getLicenseExpirationDate().invoke("text").as("Date");
    cy.get("@Date").then((licenseExpirationDate) => {
      license.text = licenseExpirationDate.toString();
      license.text = dayjs(license.text).format("MM/DD/YYYY");
      cy.wrap(license.text).as("licenseExpirationDate");
    });
  }
}
