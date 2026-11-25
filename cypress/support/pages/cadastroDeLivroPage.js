class CadastroDeLivroPage {
    elementos = {
        campoTitulo: '[data-cy="book-title"]',
        campoAutor: '[data-cy="book-author"]',
        campoISBN: '[data-cy="book-isbn"]',
        campoCategoria: '[data-cy="book-category"]',
        campoAnoPublicacao: '[data-cy="book-year"]',
        campoQuantidade: '[data-cy="book-quantity"]',
        condicaoNovo: '[data-cy="condition-new"]',
        condicaoBomEstado: '[data-cy="condition-good"]',
        condicaoUsado: '[data-cy="condition-used"]',
        botaoSalvar: '[data-cy="book-save"]',
        mensagemLivro: '[data-cy="book-message"]',
        botaoTelaLivros: '[data-cy="nav-books"]',
        linhaLivro: '[data-cy="book-row"]'
    }

    preencherTitulo(titulo) {
        cy.get(this.elementos.campoTitulo).type(titulo)
    }

    preencherAutor(autor) {
        cy.get(this.elementos.campoAutor).type(autor)
    }

    preencherISBN(isbn) {
        cy.get(this.elementos.campoISBN).type(isbn)
    }

    selecionarCategoria(categoria) {
        cy.get(this.elementos.campoCategoria).select(categoria)
    }

    preencherAnoPublicacao(ano) {
        cy.get(this.elementos.campoAnoPublicacao).type(String(ano))
    }

    preencherQuantidade(quantidade) {
        cy.get(this.elementos.campoQuantidade).clear().type(String(quantidade))
    }

    selecionarCondicao(condicao) {
        const condicoes = {
            Novo: this.elementos.condicaoNovo,
            Bom: this.elementos.condicaoBomEstado,
            Usado: this.elementos.condicaoUsado
        }

        if (!condicoes[condicao]) {
            throw new Error(`Condição inválida: ${condicao}`)
        }

        cy.get(condicoes[condicao]).check()
    }

    clicarEmSalvarLivro() {
        cy.get(this.elementos.botaoSalvar).click()
    }

    validarMensagemDeSucesso() {
        cy.get(this.elementos.mensagemLivro)
            .should('be.visible')
            .and('have.text', 'Livro cadastrado com sucesso!')
    }

    abrirTelaDeLivros() {
        cy.get(this.elementos.botaoTelaLivros).click()
    }

    validarLivroNaTelaDeLivros(titulo, autor) {
        cy.contains(this.elementos.linhaLivro, titulo)
            .should('contain.text', autor)
    }
}

export default CadastroDeLivroPage