///<reference types ='cypress'/>

describe("esperas...", () => {
  beforeEach(() => {
    cy.visit("https://www.wcaquino.me/cypress/componentes.html ")
    cy.reload() //serve para a cada teste o reload limpar a tela.
  })

  //aqui vamos esperar ate que o elemento apareça
  it("Esperando elemento", () => {
    cy.get("#novoCampo").should("not.exist") //aqui vemos se ele nao esta na tela
    cy.get("#buttonDelay").click() //clicamos no elemento
    cy.get("#novoCampo").should("not.exist") //vemos se ele ainda nao aparece na tela
    cy.get("#novoCampo").should("exist") // vemos que agora ele aparece
    cy.get("#novoCampo").type("Funciona") // a agora sim ele funciona e aparece na tela.
  })

  // Nunca devemos fazer duas assertivas ao contrario.
  it("Deve fazer Retrys", () => {
    cy.get("#novoCampo").should("not.exist") //aqui vemos se ele nao esta na tela
    cy.get("#buttonDelay").click() //clicamos no elemento
    cy.get("#novoCampo").should("not.exist") //vemos se ele ainda nao aparece na tela
    cy.get("#novoCampo").should("exist") // vemos que agora ele aparece
    cy.get("#novoCampo").type("Funciona")
  })

  it("Uso do Find", () => {
    cy.get("#buttonList").click() // setamos o elemento
    cy.get("#lista li") // Busamos a lista trazendo o elemento li
      .find("span") //setamos o local onde estão os itens da lista
      .should("contain", "Item 1")
    cy.get("#lista li span") // Buscamos a lista trazendo o elemento li junto com span para ditar todo o caminho para ser encontrado atraves do span
      //.find('span')//Não conseguimos usar o find porque ele esta com a visao voltada para o elemento 1 e nao consegue visualizar o iten 2
      .should("contain", "Item 2")
  })

  it("Uso do timeout", () => {
    // Por padrão o cypress espera 4s obde podemnos alterar no arquivo de configuração ou direto no teste como no exemplo abaixo
    cy.get("#buttonDelay").click() //clicamos no elemento
    cy.get("#novoCampo", {timeout: 4000}).should("exist") //verificamos se ele existe
    cy.get("#buttonList").click()
    cy.wait(5000)
    cy.get("#lista li span")
    .should("contain", "Item 2")
    cy.get("#buttonList").click()
    cy.get("#lista li span", {timeout: 7000})
    .should("have.length", 2)
})

  // serve para clicar no buton e mostrar que não tem espera
  it.only("CLICK RETRY", () => {
    cy.get("#buttonCount") // buscamos o elemento
      .click() //clicamos no botão
      .should("have.value", "11") //verificamos se funciona
  })

  // A diferença é que o should nao espera que o get execute e o then espera o get teminal para executar.
  it("then vs should", () => {
    cy.get("#buttonListDOM").then(($el) => {
      //inspecionamos p elementos
      expect($el).to.have.length(1)
      cy.get("#buttonList") //o should ele nao controle sua repetiçao e nao acita vc realizar uma nova busca.
    })
  })
})
