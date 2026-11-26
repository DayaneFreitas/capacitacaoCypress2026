/// <reference types="cypress" />

import CadastroDeLivroPage from '../../support/pages/cadastroDeLivroPage'
import LoginPage from '../../support/pages/loginPage'

describe('Cadastro de livros com Page Object', () => {
    const cadastroDeLivroPage = new CadastroDeLivroPage()
    const loginPage = new LoginPage()

    const livroDeTeste = {
        titulo: 'Livro de teste Cypress',
        autor: 'Autor de teste',
        isbn: '9780000000001',
        categoria: 'Ficção',
        ano: 2021,
        quantidade: 2,
        condicao: 'Bom'
    }

    // Autentica e abre o formulário antes de cada cenário.
    beforeEach(() => {
        cy.visit('/')
        cy.login('valido') // Usa o comando customizado de login
        /*loginPage.preencherCampoEmail('qa@biblioteca.com')
        loginPage.preencherCampoSenha('Cypress123!')
        loginPage.clicarNoBotaoEntrar()
        cy.get('[data-cy="current-user"]')
            .should('be.visible')
            .and('have.text', 'QA Demonstração')*/
        cy.get('[data-cy="nav-book-form"]').click()
        cy.get('#view-book-form h2').should('have.text', 'Cadastrar livro')
    })

    // Preenche os dados do exemplar usando os métodos da Page Object.
    const preencherFormularioLivro = (livro) => {
        cadastroDeLivroPage.preencherTitulo(livro.titulo)
        cadastroDeLivroPage.preencherAutor(livro.autor)
        cadastroDeLivroPage.preencherISBN(livro.isbn)
        cadastroDeLivroPage.selecionarCategoria(livro.categoria)
        cadastroDeLivroPage.preencherAnoPublicacao(livro.ano)
        cadastroDeLivroPage.preencherQuantidade(livro.quantidade)
        cadastroDeLivroPage.selecionarCondicao(livro.condicao)
    }

    it('cadastra um novo livro e o exibe na tela de livros', () => {
        preencherFormularioLivro(livroDeTeste)
        cadastroDeLivroPage.clicarEmSalvarLivro()

        cadastroDeLivroPage.validarMensagemDeSucesso()
        cadastroDeLivroPage.abrirTelaDeLivros()
        cadastroDeLivroPage.validarLivroNaTelaDeLivros(
            livroDeTeste.titulo,
            livroDeTeste.autor
        )
    })

    it('não permite cadastrar novamente um livro com o mesmo ISBN', () => {
        // Cadastra o exemplar uma vez para preparar a tentativa duplicada.
        preencherFormularioLivro(livroDeTeste)
        cadastroDeLivroPage.clicarEmSalvarLivro()
        cadastroDeLivroPage.validarMensagemDeSucesso()

        // Tenta cadastrar novamente os mesmos dados e espera uma resposta de erro.
        cy.get('[data-cy="nav-book-form"]').click()
        preencherFormularioLivro(livroDeTeste)
        cadastroDeLivroPage.clicarEmSalvarLivro()

        cy.get('[data-cy="book-message"]')
            .should('be.visible')
            .and('have.text', 'Cadastro não realizado. Livro já existente!')
            .and('not.have.class', 'success')

        // Confirma que a tentativa não criou uma segunda linha para o livro.
        cadastroDeLivroPage.abrirTelaDeLivros()
        cy.get('[data-cy="book-row"]')
            .filter((_, row) => row.textContent.includes(livroDeTeste.titulo))
            .should('have.length', 1)
    })
})
