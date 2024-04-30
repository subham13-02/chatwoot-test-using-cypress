const locators = {
    campaignsIcon: 'a[href="/app/accounts/96051/campaigns"]',
    titleInput: 'input[placeholder="Please enter the title of campaign"]',
    messageInput: "form [data-placeholder='Please enter the message of campaign']",
    selectInbox: 'label:nth-child(3)  select:nth-child(1)', 
    urlInput: 'input[placeholder="Please enter the URL"]',
    timeInput: 'input[placeholder="Please enter the time"]',
    enableCampaignCheckbox: 'input[name="enabled"]',
    triggerDuringBusinessHoursCheckbox: 'input[name="triggerOnlyDuringBusinessHours"]',
    createFormButton: 'button[data-v-7ec558c1] span.button__content',
    latestCampaign: ":nth-child(1) > .w-full > :last",
    updateFormButton: "button[data-v-24733e72] span.button__content",
    confirmDelete: "button.alert",
};

class Campaigns {
    clickCampaignIcon(){
        cy.get(locators.campaignsIcon).click();
    }

    verifyInsideCampaign() {
        cy.contains('span', 'Ongoing campaigns').should('be.visible');
    }

    clickCreateCampaignButton() {
        cy.get('button').contains('Create a ongoing campaign').click();
    }

    checkFormVisible(){
        cy.get('h2').contains('Create a campaign').should('is.visible');
    }

    fillTitle(title) {
        cy.get(locators.titleInput).type(title);
    }

    fillMessage(message) {
        cy.get(locators.messageInput).type(message);
    }

    selectInbox(inbox) {
        cy.get(locators.selectInbox).select(inbox);
    }

    fillURL(url) {
        cy.get(locators.urlInput).type(url);
    }

    fillTime(time) {
        cy.get(locators.timeInput).type(time);
    }

    checkEnableCampaignCheckbox() {
        cy.get(locators.enableCampaignCheckbox).check();
    }

    uncheckEnableCampaignCheckbox() {
        cy.get(locators.enableCampaignCheckbox).scrollIntoView().uncheck();
    }

    checkTriggerDuringBusinessHours() {
        cy.get(locators.triggerDuringBusinessHoursCheckbox).scrollIntoView().check();
    }

    createFormButtons(buttonName) {
        cy.get(locators.createFormButton).contains(buttonName).click();
    }

    checkLatestCreatedCampaign(expectedTitle) {
        cy.get(locators.latestCampaign).contains(expectedTitle);
    }

    clickUpdateCampaignButton(){
        cy.get(locators.latestCampaign).contains('button','Edit').click()
    }
    updateTitle(title) {
        cy.get(locators.titleInput).clear().type(title);
    }
    checkLatestUpdatedCampaign(expectedTitle) {
        cy.get(locators.latestCampaign).contains(expectedTitle);
    }
    updateFormButtons(buttonName) {
        cy.get(locators.updateFormButton).contains(buttonName).click();
    }
    clickDeleteCampaignButton(){
        cy.get(locators.latestCampaign).contains('button','Delete').click()
    }
    confirmDeleteCampaign() {
        cy.get(locators.confirmDelete).contains('Yes, Delete').click(); 
    }
    checkDeleteCampaign(unexpectedTitle){
        cy.get(locators.latestCampaign).contains(unexpectedTitle).should('not.exist')
    }

    checkEnabledCampaign(){
        cy.get(locators.latestCampaign).contains('Enabled');
    }

    checkDisabledCampaign(){
        cy.get(locators.latestCampaign).contains('Disabled');
    }
}
export default Campaigns;