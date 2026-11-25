import LoginPage from "../../support/pages/loginPage";
import PortalPage from "../../support/pages/portalPage";

describe('Login usando Page Object', () => {
    const loginPage = new LoginPage()
    const portalPage = new PortalPage()

    beforeEach(() => {
        cy.visit('/')
    })

    it('autentica com as credenciais válidas do fixture e exibe a tela principal', () => {
        // Carrega do fixture os dados válidos preparados para o teste.
        cy.fixture('usuarios').then(({ valido }) => {
            // Preenche os campos e envia o formulário usando o Page Object.
            loginPage.preencherCampoEmail(valido.email)
            loginPage.preencherCampoSenha(valido.senha)
            loginPage.clicarNoBotaoEntrar()
        })

        // Confirma que a tela principal foi aberta e identifica o usuário autenticado.
        portalPage.validarTelaPrincipal()
        portalPage.validarUsuarioLogado('QA Demonstração')
    })

    it('rejeita credenciais inválidas e permanece na tela de login', () => {
        // Carrega do fixture os dados inválidos preparados para o teste.
        cy.fixture('usuarios').then(({ invalido }) => {
            // Tenta autenticar usando a senha inválida.
            loginPage.preencherCampoEmail(invalido.email)
            loginPage.preencherCampoSenha(invalido.senha)
            loginPage.clicarNoBotaoEntrar()
        })

        // Confirma o erro e que o usuário não foi autenticado nem acessou a tela principal.
        loginPage.validarMensagemErroLogin('E-mail ou senha inválidos.')
        portalPage.validarUsuarioLogado('Visitante')
        portalPage.validarTelaPrincipalNaoExibida()
    })
})