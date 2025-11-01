/// <reference types="cypress"/>

import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers'

import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro'
import produto from '../modules/produto';
import contato from '../modules/contato';

describe('Automation Excercise', () => {
    beforeEach(() => {
        
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')     
    });

    it('Exemplos de Logs', () => {
        cy.log('STEP 1 :: PGATS AUTOMAÇÃO WEB CY LOG')
        cy.log('STEP 2 :: PGATS AUTOMAÇÃO WEB CY LOG')

        cy.log('Nome do usuário: ${userData.name}')
        cy.log('Email do usuário: ${userData.email}')

        cy.log('getRandomNumber: ${getRandomNumber()}')
        cy.log('getRandomEmail: ${getRandomEmail()}')

        cy.fixture('imagem-exemplo.png').as('imagem')

        cy.log('Dog Bread: ${faker.animal.dog()}')
    });

    it('Test Case 1: Register User/Cadastrar um usuário', () => {
        
        menu.navegarParaLogin()
        login.preencherFormularioDePreCadastro(userData.name, )
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

    it('Failed-Test Case 5: Register User with existing email/Cadastrar usuário com email existente', () => {
        
        menu.navegarParaLogin()
        login.preencherFormularioDePreCadastro(userData.name, getRandomEmail())
        
        
        //Assert
        cy.contains('Email Address already exist!')
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

    it('Test Case 15: Place Order: Register before Checkout/Fazer Pedido e Registrar usuário antes de fazer finalizar a compra', () => {



    });

});
