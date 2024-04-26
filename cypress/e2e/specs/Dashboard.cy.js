import AdminChat from '../pageObjects/adminChat';
import CheckNavigators from '../pageObjects/checkNavigators';
import LoginPage from '../pageObjects/loginPage';

const dashboardPage = new CheckNavigators();
const loginPage = new LoginPage();

describe('Specs for Chatwoot dashboard', () => {
    let fixtureData;
    let authentication;
    before(() => {
        cy.fixture('data.json').then((data) => {
            fixtureData = data;
        });
        cy.fixture('authentication.json').then((data) => {
            authentication = data;
        });
        cy.fixture('authentication.json').should('exist');
        cy.fixture('data.json').should('exist');
        cy.wrap().then(()=>{
            const adminUrl=fixtureData.adminUrl;
            const validCredentials = authentication.validCredentials;
            loginPage.visit(adminUrl);
            loginPage.fillEmail(validCredentials.email);
            loginPage.fillPassword(validCredentials.password);
            loginPage.submit();
            cy.url().should('include', '/dashboard');
        })
    });
    
    beforeEach(() => {
        visit('https://app.chatwoot.com/app/accounts/96051/dashboard')
    });

    it('should display the dashboard page after successful login', () => {
        dashboardPage.verifyChatwootLogo();
        cy.url().should('contain', 'dashboard');
    });

    it('should navigate to conversation sections of dashboard by default', () => {
        dashboardPage.navigateToSetting(); 
        dashboardPage.navigateToDefault();
        dashboardPage.verifyNavigateToConversations();   
    });

    it('should navigate to different sections of the dashboard', () => {
        dashboardPage.navigateToConversations();
        dashboardPage.verifyNavigateToConversations();
        dashboardPage.navigateToContacts();
        dashboardPage.verifyNavigateToContacts();
        dashboardPage.navigateToSetting();
        dashboardPage.verifyNavigateToSetting();        
    });

    it('send message from admin side and delete that message', () => {
        const adminChat = new AdminChat();

        adminChat.clickConversationIcon();
        adminChat.clickFirstConversationUser();

        adminChat.writeMessage(fixtureData.longMessage);
        adminChat.clickOnSendMessage();
        cy.contains(fixtureData.longMessage).should('exist');
        
        adminChat.deleteLatestMessage();
        // adminChat.deleteAnyMessage('subham');
        
        adminChat.writeMessage(fixtureData.sortMessage);
        adminChat.clickOnSendMessage();
        cy.contains(fixtureData.sortMessage).should('exist');
    })
});












