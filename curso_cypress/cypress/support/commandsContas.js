
import loc from './locators'//estamos invocando o raiz locartors para que possa pegar

Cypress.Commands.add('acessarMenuConta', () => {

    cy.get(loc.MENU.SETTING).click()
    cy.get(loc.MENU.BTN_CONTA).click()
})

Cypress.Commands.add('inserirUmaConta', conta => {
    cy.get(loc.CONTAS.NOME).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})