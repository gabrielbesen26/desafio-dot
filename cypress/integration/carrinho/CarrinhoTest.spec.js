/// <reference types="Cypress" />

describe('Teste na funcionalidade: Carrinho de Compras', () =>{

    const _idProduto = 1;
    const _url = Cypress.env('QA_URL');

    it('Clicando em comprar deve adicionar o item ao carrinho de compras', () => {
        cy.visit(`${_url}/index.php?id_product=${_idProduto}&controller=product`);
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
        cy.visit(`${_url}/index.php?controller=order`);
        cy.get('#cart_summary')
            .find('tbody > tr')
            .its('length')
            .should('equal', 1);
        cy.get('.cart_product > a > img')
            .should('have.attr', 'src')
            .and('equal', `${_url}/img/p/3/3-small_default.jpg`);
    })

})