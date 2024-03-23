///<reference types = 'cypress'/>


describe('Work whit alerts', () => {

    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html ')
    })
    beforeEach(() => {
        cy.reload()//serve para a cada teste o reload limpar a tela.
    })
        //msg que aparece na pagina e inpede de executa qualquer outra ação.
    it ('Alerts', () => {
       // cy.get('#alert').click()
       // cy.on('window:alert', msg => { //todo alert vem do window entao passamos o window: alert e gaudamos dentro de msg
       // console.log(msg) //pedi para imprimir a msg dentro do console.
       // expect(msg).to.be.equal('Alert Simples')// validamos se realmente existe a mensagem
    //
    //})
      cy.clickAlert('#alert', 'Alert Simples' ) // aqui é o coomando da função que criamos la no commands.js e chamamos o metodo desta forma.
    
    })
    
    it ('Alerts com mock', () => { 
        const stub = cy.stub().as('Alerta') //stub serve para substituir e mockar// .as é a função para dar nome ao alerte.
        cy.on('window:alert', stub) // ouseja toda vez que o evento acontecer ira trazer a mesagem da variavel msg 
        cy.get('#alert').click().then(()=> {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')// aqui valisamos usando o then(entao)// getcall(pega a chamada)//calledWithi(chamado com)
        })

       
    })
    it('Confirm (Confirmação)', () => { 
        cy.on('window:confirm', msg => {   //Nunca se esquecer de mudar o (window:confirm/alert)
            expect(msg).to.be.equal('Confirm Simples')
        }) 
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')

        })
        cy.get('#confirm').click()
    })

    it('Denay(negação)', () => { 
        cy.on('window:confirm', msg => {   //Nunca de esquecer de mudar o (window:confirm/alert)
            expect(msg).to.be.equal('Confirm Simples')
            return false // return serve para dizer ao cypress clicar em canselar
        }) 
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')//para negar é so colocar no confirm simple (return false)

        })
        cy.get('#confirm').click()
    })

    it('Pronpt ', () => { 
        cy.window().then(win =>{    //usamos o window para pegar toda a pagina e colocamos promises then
            cy.stub(win, 'prompt').returns('42')// cypress buca o window da pagina e pega o prompt e returns 42
        })
        
        cy.on('window:confirm', msg => {   //Nunca de esquecer de mudar o (window:confirm/alert)
            expect(msg).to.be.equal('Era 42?')// aqui validamos a msg da pagina do confirm
        }) 
            cy.on('window:alert', msg => {
                expect(msg).to.be.equal(':D')// e aqui a msg que tem no alert
            })
        cy.get('#prompt').click()// clicamos no prompt
    })

    
})

    

