import Campaigns from "../pageObjects/campaigns";
import { faker } from '@faker-js/faker';

const campaigns = new Campaigns();

describe('Specs for managing campaigns', () => {
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

    it('Should create a new campaign successfully', () => {
        const title = faker.lorem.words(3);
        const message = faker.lorem.sentences(2);
        const url = faker.internet.url();
        const inboxValue = '40652';

        cy.visit('/');
        campaigns.clickCampaignIcon();
        campaigns.verifyInsideCampaign();
        campaigns.clickCreateCampaignButton();
        campaigns.fillTitle(title);
        campaigns.fillMessage(message);
        campaigns.selectInbox(inboxValue);
        campaigns.fillURL(url);
        campaigns.checkTriggerDuringBusinessHours();

        campaigns.createFormButtons('Create');
        campaigns.checkLatestUpdatedCampaign(title);
    });

    it('create check the enable and disable campaign', ()=>{
        cy.visit('/');
        campaigns.clickCampaignIcon();
        campaigns.verifyInsideCampaign();
        
        campaigns.clickUpdateCampaignButton();
        campaigns.uncheckEnableCampaignCheckbox();
        campaigns.updateFormButtons('Update');
        campaigns.verifyInsideCampaign();
        campaigns.checkDisabledCampaign();

        campaigns.clickUpdateCampaignButton();
        campaigns.checkEnableCampaignCheckbox();
        campaigns.updateFormButtons('Update');
        campaigns.verifyInsideCampaign();
        campaigns.checkEnabledCampaign();
    });

    it('Should cancel creating a new campaign', () => {
        cy.visit('/');
        campaigns.clickCampaignIcon();
        campaigns.verifyInsideCampaign();
        campaigns.clickCreateCampaignButton();

        campaigns.fillTitle('Cancelled Campaign');
        campaigns.fillMessage('This campaign will be cancelled.');

        campaigns.createFormButtons('Cancel');

        cy.contains('Ongoing campaigns').should('be.visible');
        cy.contains('Cancelled Campaign').should('not.exist');
    });

    it('Edit latest Campaign', () => {
        const title = faker.lorem.words(4);

        cy.visit('/');
        campaigns.clickCampaignIcon();
        campaigns.verifyInsideCampaign();
        campaigns.clickUpdateCampaignButton();
        campaigns.updateTitle(title);
        campaigns.updateFormButtons('Update');
        campaigns.checkLatestUpdatedCampaign(title);
    });

    it('Update then Delete latest Campaign', () => {
        const title = faker.lorem.words(4);

        cy.visit('/');
        campaigns.clickCampaignIcon();
        campaigns.verifyInsideCampaign();
        campaigns.clickUpdateCampaignButton();
        campaigns.updateTitle(title);
        campaigns.updateFormButtons('Update');
        campaigns.checkLatestUpdatedCampaign(title);

        campaigns.verifyInsideCampaign();
        campaigns.clickDeleteCampaignButton();
        campaigns.confirmDeleteCampaign();
        campaigns.checkDeleteCampaign(title);
    });
});


