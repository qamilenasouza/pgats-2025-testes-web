import { faker, Faker } from "@faker-js/faker"
class Carrinho {

    addProdutoNoCarrinho(numeroProduto) {
        
        cy.get(".product-image-wrapper")
        .eq(numeroProduto - 1)
        .trigger("mouseover")
        .within(() => {
            cy.get(".add-to-cart").first().click()
        })

        cy.contains('Added!')   
    }

    verCarrinho() {

        cy.contains('a[href="/view_cart"]', 'View Cart').should('be.visible').click()
    }

    fazerCheckout() {

        cy.contains("Proceed To Checkout").click()
        cy.get('#address_delivery').invoke('text').then((text) => {
            const value = text.trim()
            cy.get('#address_delivery').should('contain.text', value)
            cy.get(".form-control").type("Adicionando nota no carrinho de compras!")

            cy.contains("Place Order").click()
        })
    }

    realizarPagamento() {

        const cardNumber = faker.finance.creditCardNumber().replace(/\D/g, '').slice(0, 16)
        const cvc = faker.finance.creditCardCVV()
        const future = faker.date.future()
        const expMonth = String(future.getMonth() + 1).padStart(2, '0')
        const expYear = String(future.getFullYear())
        const nameOnCard = `${faker.person.firstName()} ${faker.person.lastName()}`

        cy.get('body').then(($body) => {
            if ($body.find('input[name="name_on_card"]').length) {
                cy.get('input[name="name_on_card"]').should('be.visible').clear().type(nameOnCard)
            } else {
                cy.get('input.form-control').first().should('be.visible').clear().type(nameOnCard)
            }
        })

        // preencher número do cartão
        cy.get('input.form-control.card-number').should('be.visible').clear().type(cardNumber, { log: false })

        // preencher CVC
        cy.get('input.form-control.card-cvc').should('be.visible').clear().type(cvc, { log: false })

        // preencher mês de expiração (alguns sites usam "card-expiry-month" ou "card-expiry-mon")
        cy.get('input.form-control.card-expiry-month, input.form-control.card-expiry-mon')
            .first()
            .should('be.visible')
            .clear()
            .type(expMonth)

        // preencher ano de expiração
        cy.get('input.form-control.card-expiry-year').should('be.visible').clear().type(expYear)

        cy.get('[data-qa="pay-button"]').should('be.visible').click()
        cy.contains('Order Placed!')   

    }

}

export default new Carrinho()