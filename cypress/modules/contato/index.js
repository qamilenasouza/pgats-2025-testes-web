
import userData from '../../fixtures/example.json'
class Contato {

    preencherFormularioDeContato() {
        
        cy.get('a[href*=contact]').click()
        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()   
    }

    inscricaoParaNotificacoes() {
        
        cy.get('#footer').scrollIntoView()
        cy.get('#footer').within(() => {
        cy.get('h2').should('have.text', 'Subscription')
            
        cy.get('#susbscribe_email').type(userData.email)
        cy.get('#subscribe').click()

        cy.get('#success-subscribe').should('be.visible').and('contain.text','You have been successfully subscribed!')
            
        });

    }


}

export default new Contato()