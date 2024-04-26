const locators = {
    siginButton: 'a[class="hidden navbar-link sm:inline-block"]',
    emailInput: '[data-testid="email_input"]',
    passwordInput: '[data-testid="password_input"]',
    submitButton: '[data-testid="submit_button"]',
    loginHeaderText: '.mt-6'
};

class LoginPage {
    visit(url) {
        cy.visit(url);
        cy.get(locators.siginButton).click()
    }

    fillEmail(email) {
        cy.get(locators.emailInput).type(email);
    }

    fillPassword(password) {
        cy.get(locators.passwordInput).type(password);
    }

    submit() {
        // cy.contains(locators.submitButton).click();
        cy.contains('button', 'Login').click();
    }

    verifyInsideLoginPage() {
        cy.get(locators.loginHeaderText).should('contain', 'Login to Chatwoot');
        cy.url().should('contain', 'login');
    }
}
export default LoginPage;

