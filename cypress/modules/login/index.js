import { faker } from '@faker-js/faker';

import {
    getRandomNumber,
    getRandomEmail
} from '../../support/helpers'

class Login {
    preencherFormularioDePreCadastro() {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
          
        cy.get('[data-qa="signup-name"]').should('be.visible').type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
        
        cy.wrap(`${firstName} ${lastName}`).as('fullName')

        cy.get('[data-qa="signup-button"]').click()
    }

    preencherFormularioDeLogin(user, pass) {
        
        cy.get('[data-qa="login-email"]').type(user)
        cy.get('[data-qa="login-password"]').type(pass)
        cy.get('[data-qa="login-button"]').click()
    }

}

export default new Login()