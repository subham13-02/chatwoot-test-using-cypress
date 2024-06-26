import AdminChat from '../pageObjects/adminChat';
import { faker } from '@faker-js/faker';

describe('Specs for Chatwoot dashboard', () => {
    let authentication;
    const adminChat = new AdminChat();
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
        
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickAllChatTab();
        adminChat.checkAllConversationFetched();
        adminChat.clickFirstConversationUser();
        adminChat.writeMessage(longMessage);
        adminChat.clickOnSendMessage();
        cy.contains(longMessage).should('exist');
        adminChat.deleteLatestMessage();        
        adminChat.writeMessage(sortMessage);
        adminChat.clickOnSendMessage();
        adminChat.checkMessageExist(sortMessage);
        
    });
    it('send private message from admin side and delete that message', () => {
        const sortMessage = faker.lorem.words(2);

        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickAllChatTab();
        adminChat.checkAllConversationFetched();
        adminChat.clickFirstConversationUser();
        adminChat.writePrivateMessage(sortMessage)
        adminChat.checkMessageExist(sortMessage);
        adminChat.deleteLatestMessage();
    });
    it('test conversation assigned agent from mine to unassigned', ()=>{
        let currentUsername;
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickAllChatTab();
        adminChat.checkAllConversationFetched();
        adminChat.clickMineChatTab();
        adminChat.clickFirstConversationUser();
        
        adminChat.getCurrentUserName().then(username => {
            currentUsername = username;

            adminChat.makeSureMoreDetailsIsClicked();
            adminChat.makeSureConversationActionIsClicked();       
            adminChat.selectAssignAgentSelector();
            adminChat.selectAssignedNone(); 

            adminChat.clickConversationIcon();
            adminChat.clickUnassignedChatTab();
            adminChat.checkUserIsInsideUnassigned(currentUsername);
        });
    });
    it('test conversation assigned agent from unassigned to mine', ()=>{
        let currentUsername;
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickAllChatTab();
        adminChat.checkAllConversationFetched();
        adminChat.clickUnassignedChatTab();
        adminChat.clickFirstConversationUser();
        
        adminChat.getCurrentUserName().then(username => {
            currentUsername = username;

            adminChat.makeSureMoreDetailsIsClicked();
            adminChat.makeSureConversationActionIsClicked();       
            adminChat.selectAssignedSelf(); 
            adminChat.clickConversationIcon();
            adminChat.clickMineChatTab();
            adminChat.checkUserIsInsideUnassigned(currentUsername);
        });
    });
    it('test count on different tabs assigned', ()=>{
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickAllChatTab();
        adminChat.checkAllConversationFetched();
        adminChat.getAllConversationCount().then((allCount) => {
            adminChat.getMineConversationCount().then((mineCount) => {
                adminChat.getUnassignedConversationCount().then((unassignedCount) => {
                    expect(allCount).to.eq(mineCount + unassignedCount);
                });
            });
        });
    });
    it('test conversation assigned agent from mine to unassigned and verify counts of conversation in each tabs after that', ()=>{
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickAllChatTab();
        adminChat.checkAllConversationFetched();
        adminChat.getAllConversationCount().then((initialAllCount) => {
            adminChat.getMineConversationCount().then((initialMineCount) => {
                adminChat.getUnassignedConversationCount().then((initialUnassignedCount) => {
                    expect(initialAllCount).to.eq(initialMineCount + initialUnassignedCount);

                    adminChat.clickMineChatTab();
                    adminChat.clickFirstConversationUser();
                    adminChat.makeSureMoreDetailsIsClicked();
                    adminChat.makeSureConversationActionIsClicked();       
                    adminChat.selectAssignAgentSelector();
                    adminChat.selectAssignedNone(); 
                    cy.reload();
                    adminChat.clickConversationIcon();
                    adminChat.clickAllChatTab();
                    adminChat.checkAllConversationFetched();
                    adminChat.getAllConversationCount().then((currentAllCount) => {
                        adminChat.getMineConversationCount().then((currentMineCount) => {
                            adminChat.getUnassignedConversationCount().then((currentUnassignedCount) => {
                                expect(currentAllCount).to.eq(currentMineCount + currentUnassignedCount);
                                expect(currentMineCount).to.eq(initialMineCount - 1);
                                expect(currentUnassignedCount).to.eq(initialUnassignedCount + 1);
                            });
                        });
                    });                 
                });
            });
        });
    });
    it('test conversation assigned agent from unassigned to mine and verify counts of conversation in each tabs after that', ()=>{
        cy.visit('/');
        adminChat.clickConversationIcon();
        adminChat.clickAllChatTab();
        adminChat.checkAllConversationFetched();
        adminChat.getAllConversationCount().then((initialAllCount) => {
            adminChat.getMineConversationCount().then((initialMineCount) => {
                adminChat.getUnassignedConversationCount().then((initialUnassignedCount) => {
                    expect(initialAllCount).to.eq(initialMineCount + initialUnassignedCount);

                    adminChat.clickUnassignedChatTab();
                    adminChat.clickFirstConversationUser();
                    adminChat.makeSureMoreDetailsIsClicked();
                    adminChat.makeSureConversationActionIsClicked();       
                    adminChat.selectAssignedSelf(); 
                    cy.reload();
                    adminChat.clickConversationIcon();
                    adminChat.clickAllChatTab();
                    adminChat.checkAllConversationFetched();
                    adminChat.getAllConversationCount().then((currentAllCount)=>{
                        adminChat.getMineConversationCount().then((currentMineCount)=>{
                            adminChat.getUnassignedConversationCount().then((currentUnassignedCount)=>{
                                expect(currentAllCount).to.eq(currentMineCount + currentUnassignedCount);
                                expect(currentUnassignedCount).to.eq(initialUnassignedCount - 1);
                                expect(currentMineCount).to.eq(initialMineCount + 1);
                            });
                        });
                    });
                });
            });
        });
    });

    //################################### Iframe of user side Chat is not accessible. ####################################
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
    //#############################################################################################################################
})