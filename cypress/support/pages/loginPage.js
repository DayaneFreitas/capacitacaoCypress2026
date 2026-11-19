class LoginPage {
    //Página com os elementos e ações da tela de Login
    elementos = {
        campoEmail: '#login-email',
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
} export default LoginPage