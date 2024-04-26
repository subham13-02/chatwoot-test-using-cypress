const locators = {
    chatwootLogo: "img[alt='Chatwoot']",
    conversationsIcon: 'a[href="/app/accounts/96051/dashboard"][data-original-title="null"]',
    contactsIcon: 'a[href="/app/accounts/96051/contacts"]',
    settingIcon:'a[href="/app/accounts/96051/settings"]',
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
}

export default CheckNavigators;
