export class WriteFileHelper {
  writeFile(name, licenseNumber, licenseStatus, expirationDate) {
    cy.get(`@${name}`).then((name) => {
      cy.get(`@${licenseNumber}`).then((licenseNumber) => {
        cy.get(`@${licenseStatus}`).then((licenseStatus) => {
          cy.get(`@${expirationDate}`).then((expirationDate) => {
            cy.writeFile("cypress/output/data.json", {
              name: name,
              licenseNumber: licenseNumber,
              licenseStatus: licenseStatus,
              expirationDate: expirationDate,
            });
          });
        });
      });
    });
  }
}
