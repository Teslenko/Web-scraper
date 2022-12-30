declare namespace Cypress {
  interface Chainable {
    navigateToFindMyDoctorPage(): Chainable;

    matchImageSnapshot(screenshot: string): Cypress.Chainable;
  }
}
