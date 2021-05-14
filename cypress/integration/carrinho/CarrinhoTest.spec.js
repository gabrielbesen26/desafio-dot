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
            .should('be.visible')
            .and('have.attr', 'src')
            .and('equal', `${_url}/img/p/3/3-small_default.jpg`);
        cy.get('.cart_description')
            .should('contain.text', 'Faded Short Sleeve T-shirts')
            .and('contain.text', 'Color : Blue, Size : L');
        cy.get('.cart_avail')
            .should('contain.text', 'In stock');
        cy.get('.cart_unit')
            .should('contain.text', '$16.51');
        cy.get('.cart_quantity.text-center')
            .find('input')
            .its(1)
            .should('have.value', 1);
        cy.get('.cart_total')
            .should('contain.text', '$16.51');
        cy.get('.cart_total_price')
            .its(0)
            .should('contain.text', '$16.51');
        cy.get('.cart_total_delivery')
            .should('contain.text', '$2.00');
        cy.get('.cart_total_price')
            .its(1)
            .should('contain.text', '$18.51');
        cy.get('.cart_total_tax')
            .should('contain.text', '$0.00');
        cy.get('.cart_total_price')
            .its(2)
            .should('contain.text', '$18.51');
    });

    it('Clicar em adicionar uma quantidade deve atualizar os valores', () => {
        cy.get('.cart_quantity.text-center > div > a')
            .its(1)
            .click();
        cy.get('.cart_quantity.text-center')
            .find('input')
            .its(1)
            .should('have.value', 2);
        //BUG ENCONTRADO
        cy.get('.cart_total')
            .should('contain.text', '$33.02');
        cy.get('.cart_total_price')
            .its(0)
            .should('contain.text', '$33.02');
        cy.get('.cart_total_delivery')
            .should('contain.text', '$2.00');
        cy.get('.cart_total_price')
            .its(1)
            .should('contain.text', '$35.02');
        cy.get('.cart_total_tax')
            .should('contain.text', '$0.00');
        cy.get('.cart_total_price')
            .its(2)
            .should('contain.text', '$35.02');        
    });

    it('Editar o campo quantidade deve atualizar os valores', () => {
        cy.get('.cart_quantity.text-center')
            .find('input')
            .its(1)
            .clear()
            .type('3{enter}');
        cy.get('.cart_total')
            .should('contain.text', '$49.53');
        cy.get('.cart_total_price')
            .its(0)
            .should('contain.text', '$49.53');
        cy.get('.cart_total_delivery')
            .should('contain.text', '$2.00');
        cy.get('.cart_total_price')
            .its(1)
            .should('contain.text', '$51.53');
        cy.get('.cart_total_tax')
            .should('contain.text', '$0.00');
        cy.get('.cart_total_price')
            .its(2)
            .should('contain.text', '$51.53');
    });

})