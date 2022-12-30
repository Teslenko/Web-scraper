export class ReadFileHelper {
  readFile(name, nameData, licenseNumber, licenseNumberData) {
    cy.readFile("cypress/output/data.json")
      .its(name)
      .then((nameData) => {
        if (name.equals !== nameData) {
          cy.writeFile(
            "cypress/output/_error_output_doctor_form_/data_name.json",
            {
              NameDoesNotMatchLicenseError: "NameDoesNotMatchLicenseError",
            }
          );
        }
      });
    cy.readFile("cypress/output/data.json")
      .its(licenseNumber)
      .then((licenseNumberData) => {
        if (licenseNumber.equals !== licenseNumberData) {
          cy.writeFile(
            "cypress/output/_error_output_doctor_form_/data_number_license.json",
            {
              NumberDoesNotMatchLicenseError: "NumberDoesNotMatchLicenseError",
            }
          );
        }
      });
  }
}
