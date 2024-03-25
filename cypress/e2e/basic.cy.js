/// <reference types="cypress"/>
// Acessando a primeira Url
describe("Cypress basics", () => {
  it("Should visit a page and assert title", () => {
    cy.visit("https://www.wcaquino.me/cypress/componentes.html") // visitamos usando o cy.visit
    //const title = cy.title() esse nao pega o texto porque não esta assincrono
    // console.log(title) ou seja a aula de promises.
    //cy.pause// serve para vc ir pausando o teste.
    //.debug// Serve para ter mais detalhe sobre o teste e elementos.
    cy.title().should("be.equal", "Campo de Treinamento") // usamos o Should para fazer o cypress encontrar no tempo que for necessario
    cy.title().should("contain", "Campo")

    cy.title().debug()
      .should("be.equal", "Campo de Treinamento")
      .and("contain", "Campo") // essa é uma forma de faze, colocando o and no lugar do should

    let syncTitle
    cy.title().then((title) => {
      // aqui eu posso colocar o should que finciona tbm no lugar do then.
      console.log(title)

      cy.get("#formNome").type(title) //vou imprimir o texto que esta em title e colocar ele no campo mapeado.

      syncTitle = title
    }) //TODO imprimir o log no coonsole.

    cy.get("#elementosForm\\:sugestoes").then(($el) => {
      cy.wrap($el).type(syncTitle)
    })
  })

  it("Should find and interact whit an element", () => {
    cy.visit("https://www.wcaquino.me/cypress/componentes.html")

    //cy.get('#buttonSimple').click() Essa é um forma de fazer
    //cy.get('#buttonSimple').should('have.value', 'Obrigado!')
    cy.get("#buttonSimple").click().should("have.value", "Obrigado!") // essa é a segunda forma, nao mapeando o elemento de novo
    // lembrando que temos que setar o valor (value) ou o caminho para o cypress
  })
})
