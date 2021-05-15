/// <reference types="Cypress" />

describe('Teste na funcionalidade: Carrinho de Compras', () =>{

    const _idProduto = 1;
    const _url = Cypress.env('HOST');
    let list;

    before('Carregar lista de produtos', () => {
        cy.fixture('produtosList').then((data) => {
            list = data;
        })
    })

    it('Clicando em comprar deve adicionar o item ao carrinho de compras', () => {
        cy.visitarProduto(list.produtos[0].id);
        cy.title().should('contain', list.produtos[0].nome);
        cy.get('.shopping_cart').find('span').should('contain.text', '(empty)');
        cy.get('#quantity_wanted').clear().type('1');
        cy.get('#group_1').select('L');
        cy.get('#color_to_pick_list').find('li').its(1).click();
        
        cy.intercept({
                method : 'POST',
                url : `${_url}/*`
            }).as('postProduto');
        cy.intercept({
            method : 'GET',
            url : `${_url}/*`
        }).as('getCarrinho');

        cy.get('#add_to_cart').find('button').click();
        cy.wait('@postProduto');
        cy.get('#layer_cart').should('be.visible')
            .and('contain.text', 'Product successfully added to your shopping cart');
        cy.get('.button-container').contains('Proceed to checkout').click();
        cy.wait('@getCarrinho');
        
        cy.get('#cart_summary').find('tbody > tr').its('length')
            .should('equal', 1);
        cy.get('.cart_product > a > img').should('be.visible')
            .and('have.attr', 'src')
            .and('equal', `${_url}/img/p/3/3-small_default.jpg`);
        cy.get('.cart_description')
            .should('contain.text', list.produtos[0].nome)
            .and('contain.text', 'Color : Blue, Size : L');
        cy.get('.cart_avail').should('contain.text', 'In stock');
        cy.get('.cart_unit').should('contain.text', list.produtos[0].valor);
        cy.get('.cart_quantity.text-center').find('input').its(1)
            .should('have.value', 1);
        cy.get('.cart_total').should('contain.text', '$16.51');
        cy.get('.cart_total_price').its(0).should('contain.text', '$16.51');
        cy.get('.cart_total_delivery').should('contain.text', '$2.00');
        cy.get('.cart_total_price').its(1).should('contain.text', '$18.51');
        cy.get('.cart_total_tax').should('contain.text', '$0.00');
        cy.get('.cart_total_price').its(2).should('contain.text', '$18.51');
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
            .type('{backspace}3{enter}');
        //BUG ENCONTRADO
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

    it('Clicar no botão excluir deve remover produto do carrinho', () => {
        cy.get('.cart_quantity_delete').click();
        cy.get('.alert.alert-warning').should('be.visible')
            .and('contain.text', 'Your shopping cart is empty.');
    })

})