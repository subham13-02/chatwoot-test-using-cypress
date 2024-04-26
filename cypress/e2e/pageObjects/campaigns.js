const locators = {
    createCapaignButton:""
};

class Campaigns{
    verifyInsideCampaign(){
        cy.contains('span','Ongoing campaigns').should('is.visible');
    }

    clickCreateCampaignButton(){
        cy.get(button).contains('Create a ongoing campaign').click();
    }
}