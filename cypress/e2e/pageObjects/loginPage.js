const locators = {
    emailInput: '[data-testid="email_input"]',
    passwordInput: '[data-testid="password_input"]',
    submitButton: '[data-testid="submit_button"]',
    loginHeaderText: '.mt-6'
};

class LoginPage {
    fillEmail(email) {
        cy.get(locators.emailInput).type(email);
    }

    fillPassword(password) {
        cy.get(locators.passwordInput).type(password);
    }

    submit() {
        cy.contains('button', 'Login').click();
    }

    verifyInsideLoginPage() {
        cy.contains('Login to Chatwoot');
        cy.url().should('contain', 'login');
    }
}
export default LoginPage;

