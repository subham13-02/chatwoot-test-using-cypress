import AdminChat from '../pageObjects/adminChat';
import UserChat from '../pageObjects/userChat';
import CheckNavigators from '../pageObjects/checkNavigators';
import LoginPage from '../pageObjects/loginPage';
import { faker } from '@faker-js/faker';

const dashboardPage = new CheckNavigators();
const loginPage = new LoginPage();

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
    
    it('send message from admin side and delete that message', () => {
        const longMessage = faker.lorem.sentences(4);
        const sortMessage = faker.lorem.words(2);
        const adminChat = new AdminChat();
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickFirstConversationUser();

        adminChat.writeMessage(longMessage);
        adminChat.clickOnSendMessage();
        cy.contains(longMessage).should('exist');
        adminChat.deleteLatestMessage();        
        adminChat.writeMessage(sortMessage);
        adminChat.clickOnSendMessage();
        adminChat.checkMessage(sortMessage);
        
    });

    it('send private message from admin side and delete that message', () => {
        const sortMessage = faker.lorem.words(2);
        const adminChat = new AdminChat();
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickFirstConversationUser();
        adminChat.writePrivateMessage(sortMessage)
        adminChat.checkMessageExist(sortMessage);
        adminChat.deleteLatestMessage();
    });
    it('Verify assigned agent and unassigned agest', ()=>{
        const adminChat = new AdminChat();
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickFirstConversationUser();
    })



    //############## Iframe of user side Chat is not accessable. ###############

        // it('send message from user side', () => {
        //     const userChat = new UserChat();
        //     cy.visit('https://subham13-02.github.io/chat-user-pages/');
        //     cy.get('button[title="Open chat window"]').click();
            // cy.get('#chatwoot_live_chat_widget').then(function($iframe){
            //     let iframebody = $iframe.contents().find('body')
            //     cy.wrap(iframebody).contains("Continue conversation").click();            
            // });
            
            // cy.iframe('button[title="Open chat window"]').within(()=>{
            //     cy.contains("Continue conversation").click();  
            // })
            // cy.get('button[title="Open chat window"]').its().then(cy.wrap).find('button')
                    
            // const iframe = cy.get('#chatwoot_live_chat_widget')
            //     .its('0.contentDocument.body')
            //     .should('be.visible')
            //     .then(cy.wrap)
            // iframe.get('button:nth-child(1)').click();     
        // })
        // it.only('gets the post', () => {cy.visit('https://subham13-02.github.io/chat-user-pages/')
        //     const getIframeDocument = () => {
        //         return cy.get('#chatwoot_live_chat_widget"]')
        //             .its('0.contentDocument').should('exist')   
        //     }
        //     const getIframeBody = () => {
                // get the document
        //         return getIframeDocument()
                // automatically retries until body is loaded
        //         .its('body').should('not.be.undefined')
                // chaining more Cypress commands, like ".find(...)"
        //         .then(cy.wrap)
        //     }

        //     getIframeBody().find('button').should('have.text', 'Continue conversation').click()
        // })
})