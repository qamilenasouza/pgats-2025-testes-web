/// <reference types="cypress"/>

import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers.js'

import {faker} from '@faker-js/faker'



describe('Automation Excercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()

    });

    it('Exemplos de Logs', () => {
        cy.log('STEP 1 :: PGATS AUTOMAÇÃO WEB CY LOG')
        cy.log('STEP 2 :: PGATS AUTOMAÇÃO WEB CY LOG')

        cy.log('Nome do usuário: ${userData.name}')
        cy.log('Email do usuário: ${userData.email}')

        cy.log('getRandomNumber: ${getRandomNumber()}')
        cy.log('getRandomEmail: ${getRandomEmail()}')

        cy.fixture('imagem-exemplo.png').as('imagem')

        cy.log('Dog Bread: ${ faker.animal.dog()}')


    });

    it('Test Case 1: Register User/Cadastrar um usuário', () => {
        // Arrange
        const timestamp = new Date().getTime()

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
     
        
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester${timestamp}@test.com`)
        cy.contains('button', 'Signup').click()

        // cy.get('#id_genger1').check()
        cy.get('input[type=radio]').check('Mrs')  

        cy.get('input#password').type('12345', {log: false})

        cy.get('[data-qa=days]').select('3')
        cy.get('[data-qa=months]').select('April')
        cy.get('[data-qa=years]').select('1996')
        
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('${firstName}')
        cy.get('input#last_name').type('${lastName}')
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')
        
        // Act 
        cy.get('[data-qa="create-account"]').click()
        
        // Assert
        cy.url('').should('includes', 'account_created')
        cy.contains('b', 'Account Created!')
    });

    // qa-tester1761257693752@test.com

    it('Test Case 2: Login User with correct email and password/Login de Usuário com email e Senha corretos', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester1761257693752@test.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()
        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible')
        cy.contains('b', 'QA Tester')
    });

    it('Test Case 3: Login User with incorrect email and password/Login de Usuário com email e senha incorretos', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester1761257693752@test.com')
        cy.get('[data-qa="login-password"]').type('54321')
        cy.get('[data-qa="login-button"]').click()
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
    });

    it('Test Case 4: Logout User/Logout de Usuário', () => {
      
        cy.get('[data-qa="login-email"]').type('qa-tester1761257693752@test.com')
        cy.get('[data-qa="login-password"]').type('12345')      
        cy.get('[data-qa="login-button"]').click()
        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible').click()
        cy.url().should('contain', 'login')
    });

    it('Test Case 5: Register User with existing email/Cadastrar usuário com email existente', () => {
      
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester${timestamp}@test.com`)
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