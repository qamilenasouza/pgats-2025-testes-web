/// <reference types="cypress"/>

import { faker } from "@faker-js/faker"
import userData from '../fixtures/example.json'
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro'
import produto from '../modules/produto';
import contato from '../modules/contato';
import carrinho from "../modules/carrinho";

describe('Automation Excercise', () => {
    beforeEach(() => {
        
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')     
        cy.contains('Features Items')
    });

    it('Test Case 1: Register User/Cadastrar um usuário', () => {
        
        menu.navegarParaLogin()
        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDeCadastroCompleto()
                  
        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    });

   
    it('Test Case 2: Login User with correct email and password/Login de Usuário com email e Senha corretos', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)

        // Assert
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
        cy.contains('b', userData.name)
        cy.contains(`Logged in as ${userData.name}`).should('be.visible')

    });

    it('Test Case 3: Login User with incorrect email and password/Login de Usuário com email e senha incorretos', () => {

        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, '54321')
        
        // Assert
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });

    it('Test Case 4: Logout User/Logout de Usuário', () => {
      
        menu.navegarParaLogin()
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()

        // Assert
        cy.url().should('contain', 'login')
        cy.contains('Login to your account')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    });

    it('Test Case 5: Register User with existing email/Cadastrar usuário com email existente', () => {
        
        menu.navegarParaLogin()
        
        cy.get(`[data-qa="signup-name"]`).type(`QA Tester`)
        cy.get(`[data-qa="signup-email"]`).type(`qa-tester1761257693752@test.com`)
        cy.contains('button', 'Signup').click() 
        
        //Assert
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    it('Test Case 6: Contact Us Form/Enviar um formulário de contato com upload de arquivo', () => {
        
        contato.preencherFormularioDeContato()

        // Assert
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

    it('Test Case 8: Verify All Products and product detail page/Visualizar todos os produtos e a Página de Detalhes', () => {
        
        menu.navegarParaProdutos()
        produto.verProduto()

        // Assert
        cy.contains('button', 'Add to cart')
    });

    it('Test Case 9: Search Product/Buscar Produto', () => {

        menu.navegarParaProdutos()
        produto.buscarProduto()

        // Assert
        cy.get('h2.title.text-center').should('have.text', 'Searched Products')

    });

    it('Test Case 10: Verify Subscription in home page/Se inscrever para receber notificações utilizando email', () => {
        
        contato.inscricaoParaNotificacoes(userData.email)

        // Assert
        cy.contains('You have been successfully subscribed!')
    });

    it('Test Case 15: Place Order: Register before Checkout/Registrar e fazer pedido', () => {
        
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        
        menu.navegarParaLogin()
        login.preencherFormularioDePreCadastro(`${firstName} ${lastName}`)
        cadastro.preencherFormularioDeCadastroCompleto()

        cy.get('[data-qa="continue-button"]').should('be.visible').click()
        
        // acessando o nome de usuário que salvei após criação da conta
        cy.get('@fullName').then(fullName => {
        cy.contains(`Logged in as ${fullName}`).should('be.visible')
        
        carrinho.addProdutoNoCarrinho(1)
        carrinho.verCarrinho()
        carrinho.fazerCheckout()
        carrinho.realizarPagamento()

         cy.get('a[href="/delete_account').should('be.visible').click()
         cy.contains('Account Deleted!')


        })
    })
});
