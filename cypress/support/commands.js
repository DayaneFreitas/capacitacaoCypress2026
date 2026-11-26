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
import LoginPage from './pages/loginPage'

Cypress.Commands.add('login', (perfil) => {
    const loginPage = new LoginPage()
    return cy.fixture('usuarios').then((valido) => {
        const usuario = valido[perfil]
        loginPage.preencherCampoEmail(usuario.email)
        loginPage.preencherCampoSenha(usuario.senha)
        loginPage.clicarNoBotaoEntrar()
        cy.get('[data-cy="current-user"]')
            .should('be.visible')
            .and('have.text', 'QA Demonstração')
    })
})


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })