const conversationLocators = {
    conversationIcon: 'a[href="/app/accounts/96051/dashboard"][data-original-title="null"]',
    allTabs: '.tabs',
    firstConversationUser: 'ancient-voice-810',
    chatSection: '.ProseMirror',
    sendButton: '.right-wrap .button .button__content',
    latestMessageDots: '.conversation-panel li:last-child button[type="submit"]',
    deleteCurrentMessage: "//p[normalize-space()='Delete']", //using xpath is the only way I can find to locate delete btn.
    currentMessage: '.conversation-panel li:last-child',                                      
    confirmDelete: "button[class='button action-button smooth alert'][type='submit']"
};

class AdminChat {
    clickConversationIcon() {
        cy.get(conversationLocators.conversationIcon).click();
    }

    clickAllChatTab() {
        cy.get(conversationLocators.allTabs).contains('a', 'All').click();
    }

    clickFirstConversationUser() {
        cy.contains('h4', conversationLocators.firstConversationUser).click();
    }

    writeMessage(message) {
        cy.log(message);
        cy.get(conversationLocators.chatSection).type(message);
    }

    clickOnSendMessage() {
        cy.get(conversationLocators.sendButton).click();
    }

    deleteLatestMessage(){
        cy.get(conversationLocators.latestMessageDots).click();        
        cy.get('p').contains('Delete').click();
        cy.get(conversationLocators.confirmDelete).click();
    }

    deleteAnyMessage(message){
        cy.contains('ul.conversation-panel', message).find('button[type="submit"]').click();
        cy.get('p').contains('Delete').click();              
        cy.get(conversationLocators.confirmDelete).click();
    }
}

export default AdminChat;
