///<reference types = 'cypress'/>



describe ('Word whit alerts', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html ')
    })
    
    it('Goin back to the past', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '11/02/2021')

        //cy.clock()
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '31/12/1969')// sempre o clock tera essa date como referancia
        

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')// sempre o clock vai começar de zero por isso que ficou mes 4
        
    })
    //Serve para controlar o tempo.
    it('Goes to the future' , () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '161306')// usamos esse para pegar apenas os primeiros numeros cercentes
        cy.get('#resultado > span').invoke( 'text').should('gt', '1613062908105')//e usamos esse para invokar o text seja maior que o numero passado
        
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke( 'text').should('lte', '0')//aqui ele leva os segundos para zero 
        cy.wait(1000)
        cy.get('#resultado > span').invoke( 'text').should('lte', '1000')//aqui pedimos para ser maior ou igual a zero 
        
        cy.tick(5000)
        cy.get('#resultado > span').invoke( 'text').should('lte', '1000')// aqui estamos aumento o valor com tick e se quisermos aumentar mais e so colocar mais ticks
        cy.tick(1000)
        cy.get('#resultado > span').invoke( 'text').should('lte', '6000')


    })


})