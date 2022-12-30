export class StringHelper {
  getTextFromSelector(selector, aliasName) {
    let value;
    const valueSelector = { text: toString() };
    return cy
      .get(selector)
      .invoke("text")
      .then((text) => {
        value = /.*/.exec(text);
        value = value.map((value) => value.replace(/\s\s+/g, " "));
        cy.wrap(value).as(`Data_${aliasName}`);
        cy.get(`@Data_${aliasName}`).then((aliasData) => {
          valueSelector.text = aliasData.toString();
          cy.wrap(valueSelector.text).as(`${aliasName}`);
        });
      });
  }
}
