///<reference types = "cypress"/>

describe("Descrevendo Popup", () => {
  it("Deve preencher Popup diretamente", () => {
    cy.visit("https://www.wcaquino.me/cypress/frame.html "); // vamos fazer o visit.
    cy.get("#otherButton").click();
    cy.on("window:alert", (msg) => {
      expect(msg).to.be.equal("Click OK!");
    });
  });
  
  it("Deve preencher Popup", () => {
    cy.visit("https://www.wcaquino.me/cypress/componentes.html "); // vamos fazer o visit.
    cy.window().then((win) => {
      cy.stub(win, "open").as("winOpen");
    });
    cy.get("#buttonPopUp").click();
    cy.get("@winOpen").should("be.called");
  });

  describe("Whit links...", () => {
    beforeEach(() => {
      cy.visit("https://www.wcaquino.me/cypress/componentes.html ");
    });

    it("Check Popup Url", () => {
      cy.contains("Popup2") // o valor da link
        .should("have.prop", "href") // traçamos o caminho do valor do link
        .and("equal", "https://www.wcaquino.me/cypress/frame.html"); //validamos se realmente esta na pagina
    });
    it("Should acesso popup dinamically", () => {
      cy.contains("Popup2").then(($a) => {
        // pegamos o valor pelo nome
        const href = $a.prop("href"); // pegamos a tag e href na variavel const
        cy.visit(href); //demos uum visit no valor da tag
        cy.get("#tfield").type("Funciona"); // pegamos o campo da pagina e escrevemos que funciona
      });
    });
    //deve forçar i link da mesma pagina
    it("Should force link on same page", () => {
      cy.contains("Popup2") // pegamos o link pelo valor do nome
        .invoke("removeAttr", "target") //invokamos o o remove atributo e pedimos pera remover target
        .click(); // com esse click nao havia nada na tela e deu para escrever direto na tela
      cy.get("#tfield").type("Funciona");
    });
  });
});
