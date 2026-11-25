class LoginPage {
    //Página com os elementos e ações da tela de Login
    elementos = {
        campoEmail: '[data-cy="login-email"]',
        campoSenha: '[data-cy="login-password"]',
        botaoEntrar: 'button[data-cy="login-submit"]'
    }

    preencherCampoEmail(email){
        cy.get(this.elementos.campoEmail).type(email)
    }

    preencherCampoSenha(senha){
        cy.get(this.elementos.campoSenha).type(senha)
    }

    clicarNoBotaoEntrar(){
        cy.get(this.elementos.botaoEntrar).click()
    }

    validarEmailObrigatorio(){
        cy.get('span[class="err"]').should('have.text',"Informe o e-mail.")
    }

    validarMensagemCampoObrigatorio(msg){
        cy.get('span[class="err"]').should('have.text',msg)
    }

    validarMensagemErroLogin(mensagem){
        cy.get('[data-cy="login-message"]')
            .should('be.visible')
            .and('have.text',mensagem)
    }
} export default LoginPage