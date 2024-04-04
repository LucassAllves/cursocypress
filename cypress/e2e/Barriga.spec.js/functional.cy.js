///<reference types = 'cypress'/>

import loc from "../../support/locators"; //importamos nossos variaveis
import "../../support/commandsContas"; //aqui estamos chamando a pasta que criamos em commadsContas

describe("Should test at a functional level ", () => {
  beforeEach(() => {
    cy.login("l@l", "1"); //esta vindo a chamada do login que esta config. em commands em support
    // reset tb, esta vindo da pasta suppot/commands assim nao necessita fazer sempre o login aqui no tests
    // cy.visit('http://barrigareact.wcaquino.me/')
    // cy.get(loc.LOGIN.USER).type('l@l')
    // cy.get(loc.LOGIN.PASSWORD).type('1')
    // cy.get(loc.LOGIN.BTN_LOGIN).click()
    // cy.get(loc.MESSAGE).should('contain', 'Bem vindo, nome!')
  });
  beforeEach(() => {
    cy.get(loc.MENU.HOME).click();
    cy.resetApp(); // reset tb, esta vindo da pasta suppot/commands assim nao necessita fazer sempre o login aqui no tests
  });

  it("Should create an accont", () => {
    cy.acessarMenuConta();
    cy.inserirUmaConta("Conta de teste");
    cy.get(loc.MESSAGE).should("contain", "inserida com sucesso");
  });

  it("Should updata an account", () => {
    cy.acessarMenuConta();
    cy.get(loc.CONTAS.BTN_ALTERAR).click();
    cy.get(loc.CONTAS.NOME).clear().type("Conta para alterar");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "com sucesso");

    //cy.get(':nth-child(4) > :nth-child(2) > .fa-edit').click()
  });
  it("Should not create an account with same name ", () => {
    cy.acessarMenuConta();
    cy.get(loc.CONTAS.NOME).clear().type("Conta para movimentacoes");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "code 400");
  });
  it("Should create an transaction", () => {
    cy.get(loc.MENU.MOVIMENTACAO).click();
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type("Doc");
    cy.get(loc.MOVIMENTACAO.VALOR).type("123,00");
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type("lucas");
    cy.get(loc.MOVIMENTACAO.CONTA).select("Conta para alterar");
    cy.get(loc.MOVIMENTACAO.ESTATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso"); //validamos apenas a msg
    cy.get(loc.EXTRATO.LISTA).should("have.length", 7); // validando se na lista tem 7
    cy.get(loc.EXTRATO.BUSCA_ELEMENTOS).should("exist"); // validando se o nome com valor existe
  });
  it("Should get balance", () => {
    cy.get(loc.MENU.HOME).click();
    cy.get(loc.SALDO.SALDO_CONTA).should("be.visible");
  });

  it("Should remove an transaction", () => {
    cy.get(loc.MENU.EXTRATO).click();
    cy.get(loc.EXTRATO.BTN_DELETE).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");
  });
  //it('Should take an accout a pay', () => {
  //cy.get(loc.MENU.MOVIMENTACAO).click()
  //})
});
