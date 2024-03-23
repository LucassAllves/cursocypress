///<reference types = "cypress"/>

describe('Iframes', () => {
 
    it("Deve preencher campo", () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html ')// vamos fazer o visit.
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')  //usamos o contents para pegar as tgs filha e find para entrar dentro do body 
            cy.wrap(body).find('#tfield')// pqguei o bady e encapsulei no cypress(wrap) e busquei o elemento campo da pagina com find
            .type("Funciona?")// e escrevi funciona?
            .should('have.value', "Funciona?")// como nao texto nao se usa o conteins e sim o have.value.
        })

        cy.on('window:confirm', msg => {   //Nunca de esquecer de mudar o (window:confirm/alert) 
            expect(msg).to.be.equal('Funciona?')
        })

     })
     
    it("Deve preencher iframe diretamente", () => {
        cy.visit('https://www.wcaquino.me/cypress/frame.html ')// vamos fazer o visit.
        cy.get('#otherButton').click()
        cy.on('window:confirm', msg => {   //Nunca de esquecer de mudar o (window:confirm/alert) 
            expect(msg).to.be.equal('Funciona?')
    
        })
        cy.on('window:confirm', msg => {   //Nunca de esquecer de mudar o (window:confirm/alert) 
            expect(msg).to.be.equal('Click OK!')
       
        })
    })

})