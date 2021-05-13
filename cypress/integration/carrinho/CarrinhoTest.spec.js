/// <reference types="Cypress" />

describe('Teste na funcionalidade: Carrinho de Compras', () =>{

    it('Clicando em comprar deve adicionar o item ao carrinho de compras', () => {
        cy.visit('/produto/131037/iphone-se-branco-128gb-mhgu3br-a');
        cy.title().should('equal', 'iPhone SE Branco, 128GB - MHGU3BR/A | KaBuM!');
        cy.get('.botao-comprar').click();
        cy.get('#compre_junto').should('contain.text', 'ESTE PRODUTO FOI ADICIONADO AO CARRINHO');
        cy.visit('/carrinho');
    })

})