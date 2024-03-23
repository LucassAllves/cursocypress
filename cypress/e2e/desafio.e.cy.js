/// <reference types = 'cypress'/>

describe('desafio proposto', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html ')
    })
   // beforeEach(() => {
       // cy.reload()//serve para a cada teste o reload limpar a tela.
   // })

    it('Validar cadastro', () => { 
        const stub = cy.stub().as('alerta') //stub serve para substituir e mockar// .as é a função para dar nome ao alerte.
        cy.on('window:alert', stub) // ouseja toda vez que o evento acontecer ira trazer a mesagem da variavel msg 
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio"))
        

        
        cy.get('#formNome').type('Lucas')
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        
        cy.get('[data-cy=dataSobrenome]').type('Henrique')
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })

        //cy.get('#formCadastrar')
           // expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        

       
    
})
     