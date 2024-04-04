///<reference types = 'cypress'/>

describe("Fixture tests", () => {
  //quando se usa o this as vezes ele recusa o => arrow ai precisamos mudar para o function
  it("Get data form fixture file ", function () {
    cy.visit("https://www.wcaquino.me/cypress/componentes.html");

    cy.fixture("userData")
      .as("usuario")
      .then(() => {
        cy.get("#formNome").type(this.usuario.nome);
        cy.get("#formSobrenome").type(this.usuario.sobrenome);
        cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click(); //temos que pegar nome e value para passar o parametro da fixture

        cy.get(
          `[name=formComidaFavorita][value=${this.usuario.comida}]`
        ).click();

        cy.get("#formEscolaridade").select(this.usuario.escolaridade);
        cy.get("#formEsportes").select(this.usuario.esportes);
        cy.get("#formCadastrar").click();
        cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!"); // Pegamos o arquivo que esta em fixture e usamos aqui para preencher os valores
      });
  });
});
