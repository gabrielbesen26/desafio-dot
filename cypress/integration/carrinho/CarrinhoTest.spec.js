/// <reference types="Cypress" />

describe('Teste na funcionalidade: Carrinho de Compras', () =>{

    const _idProduto = 1;

    it('Clicando em comprar deve adicionar o item ao carrinho de compras', () => {
        cy.visit(`?id_product=${_idProduto}&controller=product`);
        cy.title()
            .should('contain', 'Faded Short Sleeve T-shirts');
        cy.get('.shopping_cart')
            .find('span')
            .should('contain.text', '(empty)');
        cy.get('#quantity_wanted')
            .clear()
            .type('1');
        cy.get('#group_1')
            .select('L');
        cy.get('#color_to_pick_list')
            .find('li')
            .its(1)
            .click();
        cy.get('#add_to_cart')
            .find('button')
            .click();
        cy.get('#layer_cart')
            .should('be.visible')
            .and('contain.text', 'Product successfully added to your shopping cart');
        cy.visit('?controller=order');
        cy.get('.shopping_cart')
            .find('span')
            .should('contain.text', '1 Product');
    })

})