/// <reference types="Cypress" />

describe('Login Tests', () => {
    // Hooks
    beforeEach(() => {
      // Intercept the request to the API
      cy.intercept('POST', '/login').as('login');
      cy.visit('/signin');
    });
  
    context('Positive Scenarios', () => {
      it('should log in', () => {
        cy.get('#username').type(Cypress.env('margarettaUser'));
        cy.get('#password').type(Cypress.env('margarettaPassword'));
        cy.get('[data-test="signin-submit"]').click();
        cy.wait('@login');
        cy.url().should('include', '/');
        cy.contains(Cypress.env('margarettaUser')).should('be.visible');
      });
    });
  
    context('Negative Scenarios', () => {
      it('should not log in', () => {
        cy.get('#username').type('margaretta');
        cy.get('#password').type('margaretta');
        cy.get('[data-test="signin-submit"]').click();
        cy.wait('@login');
        cy.url().should('include', '/signin');
        cy.contains('Username or password is invalid').should('not.be.visible');
      });
    });
  });