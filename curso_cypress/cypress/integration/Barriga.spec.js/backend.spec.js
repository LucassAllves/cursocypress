///<reference types = 'cypress'/>



describe('Should test at a functional level ', () => {
    let token
    
    before(() => {
        cy.getToken('l@l', '1')//esse commads vem do comando  que criamos para ele sempre pergar o token que esta la em support
        .then(tkn => { //aqui estamos chamando a variavel que criamos global para guardar o token
            token = tkn
        })  
    })
    
    beforeEach(() => {
     cy.resetRest() //criamos um comando do reset para que possa pegar o token.
    })
    
    it ('Should create an accont', () => {
       // calacomos o commads que criamos para ele sempre pergar o token e colocamos no before
        //cy.request({        //estmaos pedindo request(solicitação)usando o cy.request
            //method: 'POST',             //temos tres parametros para passar(metodo, erl, e corpo"body")
           // url: 'https://barrigarest.wcaquino.me/signin',
            //body: {
               // email: "l@l",
              //  redirecionar: false,
               // senha: "1"
           // }, 
                
    //.then(res => console.log(res))// pegamos a resposta no console
          //.its('body.token').should('not.be.empty') // its(isto) ai pegamos no console o caminho do tokem e validamos que nao deve estar vazio.
            //ele imprimiu o token na nossa assertiva.
     
            //.then(token => {    //para funcionar tivemos que  pegar o token e chamar ele dentro do metodo
    
        cy.request({
           url: '/contas',
           method: 'POST',
           headers: { Authorization: `JWT ${token}`}, //toda vez que precisarmos do tokem precisaremos passae eese parametros que fica no corpo da requisição da pagina
           body: {
             nome: "conta com sucesso"
           } 
                      
        }).as('response')// criamos com .as response que vai pergar todas as respostas que está na requisição
        cy.get('@response').then( res => { //colocamos a @ para deixar global a variavel response
            expect(res.status).to.be.eql(201)//aqui estamos validanndo 
            expect(res.body).to.have.property('id')//validamos se tem uma propriedade do id
            expect(res.body).to.have.property('nome', 'conta com sucesso')// verifacamos de tem no value nome o texto 
        
        })
    })
    it ('Should updata an account', () => {
       
        //cy.request({
       //    url: '/contas',
       //    method: 'GET',
       //    headers: { Authorization: `JWT ${token}`},
       //   //qs (reqeste do body para pegarmos a o caminho do nome  da requisição )
       //     qs: {
       //        nome: 'Conta para alterar'
       //     }
       cy.getContaByName('Conta para alterar')//estamos trazendo esse commands criado para nao duplicarmos o get de conta 
        .then(contaId =>  { 
            cy.request({ 
             url: `/contas/${contaId}`, //estamos pegando a resp e pegando o primeiro cenario pegando o body do console selecionando o 1 array que tem o id!! 
             method: 'PUT',  
             headers: { Authorization: `JWT ${token}` },
             body: {
                 nome: 'Conta alterada com sucesso'
                }
            }).as('response')
             //cy.get('response').its('status').shoud('be.equal', 200)
        
            }) 
            cy.get('@response').its('status').should('be.equal', 200)
    
        })
        
     
    it('Should not create an account with same name ', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}`}, //toda vez que precisarmos do tokem precisaremos passae eese parametros que fica no corpo da requisição da pagina
            body: {
              nome: "Conta mesmo nome"
            },
            // false serve para dizer pro cypress que ele pode rodar o teste mesmo dando codigo 400 
            failOnStatusCode: false
                       
         }).as('response')// criamos com .as response que vai pergar todas as respostas que está na requisição
         cy.get('@response').then( res => { //colocamos a @ para deixar global a variavel response
            console.log(res)
            expect(res.status).to.be.eql(400)//aqui estamos validanndo 
             expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')// verifacamos res.body.error (elementos do console que tem a msg de erro) se é verdadeiro.
         
         })
        
        
            
    })
    it('Should create an transaction', () => {
        // chamomos o metodo que criamos em commands para pegar a conta pelo nome.
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url: "/transacoes",
                headers: { Authorization: `JWT ${token}`},
                body: {
                    
                conta_id: contaId, // passamos o metodo que criamos para e, vez do ai para ele pegar pelo nome e nao mais pelo ID.
                // vamos utilizar uma biblioteca dinamica para deixar a data dinamica. e ela ja esta imbutida no cypress.
                data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'), //serve para acrecentarmos um dia ao pagameto da data que foi realizado.

                data_transacao: Cypress.moment().format('DD/MM/YYYY'),// E aqui serve para computarmos o dia que foi realizado a transação. 
                descricao: "Darc",
                envolvido: "lu",
                status: true,
                tipo: "REC",
                valor: "125.00"
                }

            }).as('response')
        }) 
        cy.get('@response').its('status').should('be.equal', 201) //temos essas duas formas de validar 
        cy.get('@response').its('status').should('exist')  
    })

    it('Should get balance', () =>  {
      
    })
    
    it('Should remove an transaction', () => {
    
    })




})