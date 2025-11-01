
class Produto {

    verProduto() {
        cy.get('.product-image-wrapper')
            .first()
            .within(() => {
                cy.contains('View Product').click()
            })

        cy.get('.product-information > h2').should('be.visible')

        cy.get('.product-information > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(5) > span').should('be.visible')

        cy.get('.product-information > :nth-child(6)').should('be.visible')
        cy.get('.product-information > :nth-child(7)').should('be.visible')

        cy.get('.product-information > :nth-child(8)').should('be.visible')

    }

    buscarProduto() {
        
        cy.get('#search_product').type('Blue Top')
        cy.get('#submit_search').click()
        cy.get('.product-image-wrapper').its('length').should('eq', 1)

    }
}

export default new Produto()