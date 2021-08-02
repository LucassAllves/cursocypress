///<reference types = 'cypress'/>



describe('Word whit basic elements', () => {
    // Usamos o before para dar o visit antes de rodar todos nossos tests
    // e o beforeEach para rodar antes de cada tests
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html ')
    })
    beforeEach(() => {
        cy.reload()//serve para a cada teste o reload limpar a tela.
    })

    it ("Text", () => {
       // cy.get('body').should('contain', "Cuidado")
       //cy.get('span').should('contain', "Cuidado")// utilizamos aqui o span que é aonde esta localizado o cuidado
       cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')// e aqui estmos indo direto no elemento do Cuidado
    })

    it ('links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        // vamos dar um reload na tela e ver se a msg volta 
        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')//ai verificamos se nao tem msg na tela
        // para ai sim realizarmoso click de novo 
        cy.contains('Voltar').click()// temos duas formas de busca pelo "contains" e pelo "get".
        cy.get('#resultado').should('have.text', 'Voltou!')

    })

    it ('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')// sempre se busca u texto pelo Value(valor)
        cy.get('#elementosForm\\:sugestoes')// sempre que tiver problemas com : é so colocar // junto
        .type('Textearea')
        .should('have.value', 'Textearea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
        .type('??????')

        cy.get('[data-cy=dataSobrenome]')
        .type('Testes12345{backspace}{backspace}')
        .should('have.value', 'Testes123')

        cy.get('#elementosForm\\:sugestoes')
        .clear()//vamos limpar o campo
        .type('erro{selectall}accert', {derley:100})// derley tempo de inatividade para disparar os eventos // com o selectall nos limpamos o campos e ja escrevemos o accert
        .should('have.value', 'accert')
    })
    // radiobutton click em apenas um bottum .
    it ('RadioButton', () => {
        cy.get('#formSexoFem')
        .click() // inspecionamos o button
        .should('be.checked')//verificamos se foi selecionado
        cy.get('#formSexoMasc').should('not.be.checked')//verificamos se o masculino nao foi selecionado
        cy.get("[name=formSexo]").should('be.length', 2 )//estmos verificando se a dois elementos radiobutton

    })
    //checkbox serve para clicar em varios botoes 
    it ('CheckBox', () => {
        cy.get('#formComidaPizza')// selecionamos e clicamos no elemento
        .click()
        .should('be.checked')//verificamos se o elemento esta selecionado
        cy.get('[name="formComidaFavorita"]').click({multiple: true})// aqui nos clicamos em todos os botoes.
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')

    })

    it.only ('comboBox', () => {
        cy.get('[data-test=dataEscolaridade]')// mapeamos o elemento 
        .select('2graucomp')//selecionamos o a opção 
        .should('have.value', '2graucomp')// verificamos se ele foi selecionada. 
        //Todo validar as opçoes do combo.
        cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)//peguei o campo e contei com length se tem 8 intens na option
        cy.get('[data-test=dataEscolaridade] option').then($arr =>{
            const values = []
            $arr.each(function () { //chamamos a função 
                values.push(this.innerHTML)// usamos o innerHTML para buscas as option
            })
            expect(values).to.include.members(['Superior', 'Mestrado'])// inspecionei os valores e validei se avi mestrado e superior 
        })
    })
    // aqui selecionei mais de uma opção na pagina no combobox mais uma forma de validar 
    it.only('ComboMultiplo', () => {
        cy.get('[data-testid=dataEsportes]')
        .select([ 'natacao','Corrida', 'nada' ])
        cy.get('[data-testid=dataEsportes]').then($el => { //guardamos o valor dentro de $el
            expect($el.val()).to.be.deep.equal([ 'natacao','Corrida', 'nada' ])// pegamos o valor e validamos 
            expect($el.val()).to.have.length(3)// validamos novamente 

        })
        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', [ 'natacao','Corrida', 'nada' ])// invocamos os metodo valor com arrey
         //Todo validar a pçoes do combo multiplo
    
    })
})
