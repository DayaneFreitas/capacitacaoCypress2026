class PortalPage{

    elementos = {
        usuarioLogado: '[data-cy="current-user"]',
        botaoSair: '[data-cy="logout-button"]',
        menuVisaoGeral: '[data-cy="nav-dashboard"]'
    }

    validarTelaPrincipal(){
        cy.get(this.elementos.menuVisaoGeral).should('be.visible')
    }

    validarTelaPrincipalNaoExibida(){
        cy.get(this.elementos.menuVisaoGeral).should('not.be.visible')
    }

    clicarNobotaoSair(){
        cy.get(this.elementos.botaoSair).click()
    }

    validarUsuarioLogado(usuario){
        cy.get(this.elementos.usuarioLogado).should('have.text',usuario)
    }

} export default PortalPage