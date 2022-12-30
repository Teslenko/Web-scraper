import FindMyDoctorPage from "../support/pages/FindMyDoctorPage";
import LicenseVerificationPage from "../support/pages/LicenseVerificationPage";
// @ts-ignore
import { active } from "../../cypress/test_data/licenses.json";
// @ts-ignore
import { inactive } from "../../cypress/test_data/licenses.json";
import { StringHelper } from "./helpers/StringHelper";
import { WriteFileHelper } from "./helpers/WriteFileHelper";
import { ReadFileHelper } from "./helpers/ReadFileHelper";
const enum VerificationError {
  NoLicenseFoundError = "NoLicenseFoundError",
  NameDoesNotMatchLicenseError = "NameDoesNotMatchLicenseError",
  NumberDoesNotMatchLicenseError = "NumberDoesNotMatchLicenseError",
  MultipleLicensesFoundError = "MultipleLicensesFoundError",
}

const findMyDoctorPage = new FindMyDoctorPage();
const licenseVerificationPage = new LicenseVerificationPage();
const stringHelper = new StringHelper();
const writeFileHelper = new WriteFileHelper();
const readFileHelper = new ReadFileHelper();
const licenseNumberCell = findMyDoctorPage._selectors.licenseNumberCell;
const licenseTableResult = findMyDoctorPage._selectors.licenseTableResult;
const licenseNumber = "licenseNumber";
const licenseName = "licenseName";
const licenseStatus = "licenseStatus";

describe("Web scraper", () => {
  beforeEach(() => {
    cy.navigateToFindMyDoctorPage();
  });

  it("Web scraper for active license", () => {
    findMyDoctorPage.enterPhysicianNameAndLicenseNumberAndSubmit(active);
    findMyDoctorPage.checkLicenseOnTable(licenseTableResult);
    findMyDoctorPage.getLicenseNumberCell().should("be.visible");
    findMyDoctorPage.removeTargetLinkFromSelector(licenseNumberCell);
    licenseVerificationPage.getViewContainer().should("exist");
    licenseVerificationPage.getTextLicenseExpirationDate();
    stringHelper.getTextFromSelector(
      licenseVerificationPage._selectors.licenseNumber,
      licenseNumber
    );
    stringHelper.getTextFromSelector(
      licenseVerificationPage._selectors.licenseName,
      licenseName
    );
    stringHelper.getTextFromSelector(
      licenseVerificationPage._selectors.licenseStatus,
      licenseStatus
    );
    writeFileHelper.writeFile(
      "licenseName",
      "licenseNumber",
      "licenseStatus",
      "licenseExpirationDate"
    );
    readFileHelper.readFile(
      "name",
      "Allan P Kuong",
      "licenseNumber",
      active.licenseNumber
    );
    cy.matchImageSnapshot("screenshot_active");
  });

  it("Web scraper for inactive license", () => {
    findMyDoctorPage.enterPhysicianNameAndLicenseNumberAndSubmit(inactive);
    findMyDoctorPage.checkLicenseOnTable(licenseTableResult);
    findMyDoctorPage.getLicenseNumberCell().should("be.visible");
    findMyDoctorPage.removeTargetLinkFromSelector(licenseNumberCell);
    licenseVerificationPage.getViewContainer().should("exist");
    licenseVerificationPage.getTextLicenseExpirationDate();
    stringHelper.getTextFromSelector(
      licenseVerificationPage._selectors.licenseNumber,
      licenseNumber
    );
    stringHelper.getTextFromSelector(
      licenseVerificationPage._selectors.licenseName,
      licenseName
    );
    stringHelper.getTextFromSelector(
      licenseVerificationPage._selectors.licenseStatus,
      licenseStatus
    );
    writeFileHelper.writeFile(
      "licenseName",
      "licenseNumber",
      "licenseStatus",
      "licenseExpirationDate"
    );
    readFileHelper.readFile(
      "name",
      "Laura Johnson Faherty",
      "licenseNumber",
      inactive.licenseNumber
    );
    cy.matchImageSnapshot("screenshot_inactive");
  });

  it("Checking displayability of multiple licenses ", () => {
    findMyDoctorPage.clickCitiesSpecialtiesRadioBtn();
    findMyDoctorPage.clickAlfordCityCheckbox();
    findMyDoctorPage.clickSubmitBtn();
    findMyDoctorPage.checkMultipleLicensesOnTable(licenseTableResult);
  });
});
