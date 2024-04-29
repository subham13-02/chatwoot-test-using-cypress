// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference  types="Cypress" />
/// <reference types="cypress-xpath" />

import LoginPage from '../e2e/pageObjects/loginPage'

const loginPage = new LoginPage();

Cypress.Commands.add('login', (email, password)=>{
    cy.session([email,password],()=>{
        cy.visit('/');
        cy.log(email,password)
        loginPage.fillEmail(email);
        loginPage.fillPassword(password);
        loginPage.submit();
        cy.wait(5000)
    },
    {
        cacheAcrossSpecs:true
    }
    )    
})