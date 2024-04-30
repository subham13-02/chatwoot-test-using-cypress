const locators = {
    chatwootLogo: "img[alt='Chatwoot']",
    conversationsIcon: 'a[href="/app/accounts/96051/dashboard"][data-original-title="null"]',
    contactsIcon: 'a[href="/app/accounts/96051/contacts"]',
    settingIcon:'a[href="/app/accounts/96051/settings"]',
    reportsIcon:'a[href="/app/accounts/96051/reports"]',
    campaignsIcon:'a[href="/app/accounts/96051/campaigns"]',
    helpCenterIcon:'a[href="/app/accounts/96051/portals"]',
};

class CheckNavigators{
    visit(url) {
        cy.visit(url);
    }

    navigateToDefault() {
        cy.get(locators.chatwootLogo).click();
    }
    verifyChatwootLogo() {
        cy.get(locators.chatwootLogo).should('exist');
    }

    navigateToConversations() {
        cy.get(locators.conversationsIcon).click();
    }
    verifyNavigateToConversations() {
        cy.contains('h1','Conversations').should('is.visible');
    }

    navigateToContacts() {
        cy.get(locators.contactsIcon).click();
    }
    verifyNavigateToContacts() {
        cy.contains('h1','Contacts').should('is.visible');
    }

    navigateToSetting(){
        cy.get(locators.settingIcon).click();
    }
    verifyNavigateToSetting(){
        cy.contains('span', 'Account settings').should('is.visible');
    }

    navigateToReports(){
        cy.get(locators.reportsIcon).click();
    }
    verifyNavigateToReports(){
        cy.contains('span', 'Overview').should('is.visible');
    }

    navigateToCampaigns(){
        cy.get(locators.campaignsIcon).click();
    }
    verifyNavigateToCampaigns(){
        cy.contains('span', 'Ongoing campaigns').should('is.visible');
    }

    navigateToHelpCenter(){
        cy.get(locators.helpCenterIcon).click();
    }
    verifyNavigateToHelpCenter(){
        cy.contains('h1', 'Help Center').should('is.visible');
    }
}

export default CheckNavigators;
