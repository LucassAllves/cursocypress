///<reference types = 'cypress'/>




describe('Using selector Jquery', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html ')
    })

    it('Loctor', () => {
        //existe no site W3scoll uma relação de metodos jQuere para seguir
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) > td:nth-child(3)>input').click()

        cy.get('[onclick*=\'Francisco\']').click()// essas duas formas de buscar o botão em td
        cy.get("[onclick*='Francisco']").click()

        cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3) input").click()
        cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input ")
    })
    // site xpath roseta stone par ter a tabela do xpath.
    it("Using  locators  Xpath", () => {

        cy.xpath("//input[contains(@onclick, 'Francisco')]")
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type= 'text']")
        //span[contains(., 'Doc')]/following-sibling::small[contains(., '123')]
        // usamos / barra para correr tg po tg
        //duas // para in direto no elemento.
        // /.. para subir o elemento.
    })

})