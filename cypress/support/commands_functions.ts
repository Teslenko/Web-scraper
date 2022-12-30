import FindMyDoctorPage from "./pages/FindMyDoctorPage";

/**
 * This page houses supporting functions for the Cypress commands.js file. This is in place to keep that file clean and
 * readable. Page objects and other imports should be kept to this file. This should make it
 */

const findMyDoctorPage = new FindMyDoctorPage();

let env = Cypress.env("ENV");
export function navigateToFindMyDoctorPage() {
  cy.visit(env);
  findMyDoctorPage.getSearchWrapper().should("be.visible");
}
