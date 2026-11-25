/// <reference types="cypress" />

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('realiza login com credenciais válidas', () => {
        cy.fixture('usuarios').then(({ valido }) => {
            cy.get('[data-cy="login-email"]').type(valido.email)
            cy.get('[data-cy="login-password"]').type(valido.senha)
            cy.get('[data-cy="login-submit"]').click()
        })

        cy.get('[data-cy="current-user"]')
            .should('be.visible')
            .and('have.text', 'QA Demonstração')
    })

    it('impede login com credenciais inválidas', () => {
        cy.fixture('usuarios').then(({ invalido }) => {
            cy.get('[data-cy="login-email"]').type(invalido.email)
            cy.get('[data-cy="login-password"]').type(invalido.senha)
            cy.get('[data-cy="login-submit"]').click()
        })

        cy.get('[data-cy="login-message"]')
            .should('be.visible')
            .and('have.text', 'E-mail ou senha inválidos.')
        cy.get('[data-cy="current-user"]').should('have.text', 'Visitante')
    })
})