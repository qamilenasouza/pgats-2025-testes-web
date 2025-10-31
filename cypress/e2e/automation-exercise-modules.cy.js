/// <reference types="cypress"/>

import userData from '../fixtures/example.json'
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro'

describe('Automation Excercise', () => {
    beforeEach(() => {
        
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.navegarParaLogin()
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
        
        // Arrange
        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDeCadastroCompleto()
                  
        // Assert
        cy.url('').should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    });

   
    it('Test Case 2: Login User with correct email and password/Login de Usuário com email e Senha corretos', () => {

        login.preencherFormularioDeLogin(userData.user, userData.password)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
        
        cy.get(':nth-child(10) > a')
            .should('be.visible')
            .and('have.text', `Logged in as ${userData.name}`);

        cy.contains('b', userData.name)
        cy.contains(`Logged in as ${userData.name}`).should('be.visible')

    });

    it('Test Case 3: Login User with incorrect email and password/Login de Usuário com email e senha incorretos', () => {

        login.preencherFormularioDeLogin(userData.user, '54321')
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });

    it('Test Case 4: Logout User/Logout de Usuário', () => {
      
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()

        // Assert
        cy.url().should('contain', 'login')
        cy.contains('Login to your account')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')
    });

    it('Test Case 5: Register User with existing email/Cadastrar usuário com email existente', () => {
      
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type('qa-tester1761257693752@test.com')
        cy.contains('button', 'Signup').click()
        cy.get('.signup-form > from > p').should('contain', 'Email Address already exist')
    });

    it('Test Case 6: Contact Us Form/Enviar um formulário de contato com upload de arquivo', () => {
        
        cy.get('a[href*=contact]').click()
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)

        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });


});