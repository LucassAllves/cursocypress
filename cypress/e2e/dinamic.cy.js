///<reference types = 'cypress'/>

describe("Tests dinamic", () => {
  beforeEach(() => {
    cy.visit("https://www.wcaquino.me/cypress/componentes.html ");
  });
  // pegamos todos os elementos e trabalhamos todos desta forma usando food do java script
  const foods = ["Carne", "Frango", "Pizza", "Vegetariano"];
  foods.forEach((food) => {
    it(`Cadatro com cumida ${food}`, () => {
      //comcatenamos com o IT para pegar o titulo de cada um no test
      cy.get("#formNome").type("Qualquer");
      cy.get("#formSobrenome").type("Show");
      cy.get(`[name=formSexo][value=M]`).click(); //temos que pegar nome e value para passar o parametro da fixture
      cy.get(`label:contains('${food}')`).click(); // concatenamos aqui tbm para clicar em cada um.
      cy.get("#formEscolaridade").select("Doutorado");
      cy.get("#formEsportes").select("Corrida");
      cy.get("#formCadastrar").click();
      cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!"); // Pegamos o arquivo que esta em fixture e usamos aqui para preencher os valores
    });
  });
  // pegamos o each e cricamos em todos os elementos
  it("Deve usar todos usando o Each", () => {
    cy.get("#formNome").type("Qualquer");
    cy.get("#formSobrenome").type("Show");
    cy.get(`[name=formSexo][value=M]`).click();
    cy.get('[name="formComidaFavorita"]').each(($el) => {
      //usamos esse comando para setarmos o valor
      //$el.click()
      if ($el.val() != "vegetariano")
        //pedimos para que se ouvesse algum elemento com esse valor nao deve clicar
        cy.wrap($el).click();
    }); // concatenamos aui tbm para clicar em cada um.
    cy.get("#formEscolaridade").select("Doutorado");
    cy.get("#formEsportes").select("Corrida");
    cy.get("#formCadastrar").click();
    cy.clickAlert("#formCadastrar", "Tem certeza que voce eh vegetariano?"); // esse é o camando alerte que esta configurado la em ssuport (commands)
    cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!");
  });
});
