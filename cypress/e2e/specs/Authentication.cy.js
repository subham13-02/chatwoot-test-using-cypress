import LoginPage from '../pageObjects/loginPage';

const loginPage = new LoginPage();

describe('Specs for Chatwoot App - Authentication', () => {
    let fixtureData;

    before(() => {
        cy.fixture('authentication.json').then((data) => {
            fixtureData = data;
        });
    });

    beforeEach(() => {
        const adminUrl = fixtureData.adminUrl;
        loginPage.visit(adminUrl);
        loginPage.verifyInsideLoginPage();
    });

    it('should display error message with invalid credentials', () => {
        const invalidCredentials = fixtureData.invalidCredentials;
        loginPage.fillEmail(invalidCredentials.email);
        loginPage.fillPassword(invalidCredentials.password);
        loginPage.submit();
        loginPage.verifyInsideLoginPage();
    });

    it('should successfully log in with valid credentials and logout', () => {
        const validCredentials = fixtureData.validCredentials;
        loginPage.fillEmail(validCredentials.email);
        loginPage.fillPassword(validCredentials.password);
        loginPage.submit();

    });

    it('should display error message when email field is empty', () => {
        const emptyEmail = fixtureData.emptyEmail;
        loginPage.fillPassword(emptyEmail.password);
        loginPage.submit();
        loginPage.verifyInsideLoginPage();
    });

    it('should display error message when password field is empty', () => {
        const emptyPassword = fixtureData.emptyPassword;
        loginPage.fillEmail(emptyPassword.email);
        loginPage.submit();
        loginPage.verifyInsideLoginPage();
    });
});
