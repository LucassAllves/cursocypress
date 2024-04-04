const locators = {
    LOGIN: { 
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn',
    }, 

    MENU: {
        SETTING: '[data-test=menu-settings]',
        BTN_CONTA: '[href="/contas"]',
        RESET: '[href="/reset"]',
        EXTRATO: ":nth-child(3) > .nav-link > .fas",
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        HOME: ':nth-child(1) > .nav-link > .fas'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        BTN_ALTERAR:":nth-child(1) > :nth-child(2) > :nth-child(1) > .far" 
        //"//table//td[contains(.,'Conta')]/..//i[@class='far fa-edit']"
    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        ESTATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary',
        ALTERANDO_PARA_PAGO: '[href="/movimentacao/375379"] > .fas'
    },

    EXTRATO: {
        LISTA: '.list-group > li',
        BUSCA_ELEMENTOS: '.list-group > :nth-child(7)',
        BTN_DELETE: "[class='far fa-trash-alt']:eq(2)",
    
        //"//span[contains(., 'Doc')]/following-sibling::small[contains(., '123')]",
    },
    
       

    SALDO: {
       NOME_CONTA: 'tbody > :nth-child(3) > :nth-child(1)',
       SALDO_CONTA: ':nth-child(3) > :nth-child(2)'
    },

   


  MESSAGE: '.toast-message'
}


export default locators;