// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from "./locators" //usamos o import para importar nossos comando para a raiz do nosso locators


Cypress.Commands.add('clickAlert', (locator, message) => { //serve para dar nome a um comando muito usado no projeto e chamalo com apenas o nome passando paenas os paramentro.so ir no alert
    cy.get(locator).click()
    cy.on('window:alert', msg => { 
    console.log(message) 
    expect(msg).to.be.equal(message)

    })
})
//criamos o metodo login para iniciar sempre antes de rodar o tests functional
Cypress.Commands.add('login', (user, passwd) => {
    cy.visit('http://barrigareact.wcaquino.me/')
    cy.get(loc.LOGIN.USER).type('l@l')
    cy.get(loc.LOGIN.PASSWORD).type('1')
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo, nome!')

})
// criamos o metodo resetApp para nao precisar restar o nome manualmente a cada test para evitar erros de duplo cadastro
 Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTING).click()// pegamos menu 
    cy.get(loc.MENU.RESET).click()// clicamos em resetar

})
Cypress.Commands.add('getToken', (user, passwd) => { //criei para logar e pegar o token  no /backend
    cy.request({        //estmaos pedindo request(solicitação)usando o cy.request
        method: 'POST',          
        url: '/signin',
        body: {
            email: user, //usamos aqui o user para passarmos os parametros la no metodos 
            redirecionar: false,
            senha: passwd // usamos aqui o passwd para passarmos os parametros la no metodos
        },
    }) 
    
    .its('body.token').should('not.be.empty')
    .then(token => { // entao token vai retornar token 
            return token
    })

})

Cypress.Commands.add('resetRest', () => { // estamos resetando para pegarmos o token e resetar o banco do usuario para não dar erro na /backend
    cy.getToken('l@l', '1').then(token => {
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: { Authorization: `JWT ${token}`}
    
        }).its('status').should('be.equal', 200)
    })
})
// criamos o cammans para pegar a conta pelo nome pois o id é dinamico e altera em casa vez que restamos.
Cypress.Commands.add('getContaByName', name => {
    cy.getToken('l@l', '1').then(token => {
    cy.request({
        url: '/contas',
        method: 'GET',
        headers: { Authorization: `JWT ${token}`},
        qs: {
            nome: name
           }
       }).then(res => {
        return res.body[0].id //apos emplementarmos o método devemos criar o return que ira pegar a resposta que esta dentro do body, dentro desse array ele vai pegar o primeiro elemento que tem o valuer id. Ou seja tracamos o caminho.

       })
       

    })
})