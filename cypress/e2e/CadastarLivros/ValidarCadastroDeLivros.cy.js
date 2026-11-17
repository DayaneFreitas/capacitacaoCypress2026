/// <reference types="cypress" />

describe('Validações da página de Cadastro de Livros', () => {

    //Realizar Login
    beforeEach(() => {
        cy.visit('index.html')
        cy.get('#login-email').type('qa@biblioteca.com')
        cy.get('[data-cy="login-password"]').type('Cypress123!')
        cy.get('button[data-cy="login-submit"]').click()
        cy.get('[data-cy="current-user"]').should('be.visible')
        cy.get('[data-cy="current-user"]').should('have.text','QA Demonstração')
        cy.get('button').contains('Cadastrar livro').click()
        cy.get('div[id="view-book-form"] > h2').should('have.text','Cadastrar livro')
    });

    it('Cadastrar novo livro de Ação', () => {
        cy.get('[data-cy="book-title"]').type("Matrix")
        cy.get('#author').type("Casimiro")
        //Adicionar script para os campos: ISBN, Ano de publicação e Quantidade
    });
    
});