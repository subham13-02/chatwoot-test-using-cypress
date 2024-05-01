import CheckNavigators from '../pageObjects/checkNavigators';

const dashboardPage = new CheckNavigators();

describe('Specs for Chatwoot dashboard', () => {
    let authentication;
    before(() => {
        cy.fixture('authentication.json').then((data) => {
            authentication = data;
        });
    });
    
    beforeEach(() => {
        const validCredentials = authentication.validCredentials;
        
        cy.login(validCredentials.email,validCredentials.password);
    });

    it('should display the dashboard page after successful login', () => {
        cy.visit('/');
        dashboardPage.verifyChatwootLogo();
        cy.url().should('contain', 'dashboard');
    });

    it('should navigate to conversation sections of dashboard by default', () => {      
        cy.visit('/');
        dashboardPage.navigateToSetting(); 
        dashboardPage.navigateToDefault();
        dashboardPage.verifyNavigateToConversations();   
    });

    it('should navigate to different sections of the dashboard on clicking icon', () => {
        cy.visit('/');
        dashboardPage.navigateToConversations();
        dashboardPage.verifyNavigateToConversations();

        dashboardPage.navigateToContacts();
        dashboardPage.verifyNavigateToContacts();
        
        dashboardPage.navigateToSetting();
        dashboardPage.verifyNavigateToSetting();  
        
        dashboardPage.navigateToReports();
        dashboardPage.verifyNavigateToReports();  

        dashboardPage.navigateToCampaigns();
        dashboardPage.verifyNavigateToCampaigns();  

        dashboardPage.navigateToHelpCenter();
        dashboardPage.verifyNavigateToHelpCenter(); 
    });
    
    //################# The Link of the Read Docs is not clickable after changes to target. #########################

        // it('should navigate to a new URL after clicking an Read Docs Icon', () => {
        //     cy.visit('/');
        //     cy.get('a[href="//www.chatwoot.com/docs/product/"]').invoke('removeAttr', 'target').click();
        //     cy.url().should('include', 'https://www.chatwoot.com/hc/user-guide/en');
        // });
    
        // it.only('should navigate to a new URL after clicking a Read Docs Icon', () => {
        //     cy.visit('/');
        //     cy.get('a[href="//www.chatwoot.com/docs/product/"]')
        //         .should('be.visible')
        //         .invoke('attr', 'target', '_self')
        //         .invoke('attr', 'href', 'https://www.chatwoot.com/hc/user-guide/en')
        //         .click();
        //     cy.wait(1000); // Wait for a second for the page to load
        //     cy.url().should('include', 'https://www.chatwoot.com/hc/user-guide/en');
        // });
    //#################//#################//#################//#################//#################//#################
})










