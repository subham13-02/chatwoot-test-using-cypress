import { use } from "chai";

const conversationLocators = {
    conversationIcon: 'a[href="/app/accounts/96051/dashboard"][data-original-title="null"]',
    allTabs: '.tabs',
    unassignedCount:':nth-child(1) > a > .badge > span',
    mineCount:':nth-child(2) > a > .badge > span',
    allCount:':nth-child(3) > a > .badge > span',
    allConversationLoaded:'[role="tfoot"]',
    firstConversationUser: 'div[role="group"] div[role="listitem"]:nth-child(1)',
    currentConversationUserName: "span[class='text-base font-medium leading-tight text-slate-900 dark:text-slate-100']",
    chatSection: 'p[data-placeholder="Shift + enter for new line. Start with '/' to select a Canned Response."]',
    sendButton: '.right-wrap .button .button__content',
    latestMessageDots: '.conversation-panel li:last-child button[type="submit"]',
    currentMessage: '.conversation-panel li:last-child',                                      
    confirmDelete: "button[class='button action-button smooth alert'][type='submit']",
    privateChatSection:'[data-placeholder="Shift + enter for new line. This will be visible only to Agents"]',
    assignAgentSelector:':nth-child(1) > .relative > .border',
    agentSelf:'[data-keydown-handler-index]>li:nth-child(2)',
    agentNone: '[data-keydown-handler-index]>li',
};
class AdminChat {
    clickConversationIcon() {
        cy.get(conversationLocators.conversationIcon).click();
    }

    clickAllChatTab() {
        cy.get(conversationLocators.allTabs).contains('a', 'All').click();
    }
    clickMineChatTab() {
        cy.get(conversationLocators.allTabs).contains('a', 'Mine').click();
    }
    clickUnassignedChatTab() {
        cy.get(conversationLocators.allTabs).contains('a', 'Unassigned').click();
    }

    clickFirstConversationUser() {
        cy.get(conversationLocators.firstConversationUser).click();
    }
    checkMessageExist(expectedMessage){
        cy.contains(expectedMessage).should('exist');
    }

    writeMessage(message) {
        cy.get(conversationLocators.chatSection).type(message);
    }
    writePrivateMessage(message){
        cy.get('button span').contains('Private Note').click();
        cy.get(conversationLocators.privateChatSection).type(message);
        cy.get('button').contains('Add Note (⌘ + ↵)').click();
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
        cy.get('ul.conversation-panel').should('contain',message);
        cy.contains('ul.conversation-panel', message).find('button[type="submit"]').click();
        cy.get('p').contains('Delete').click();              
        cy.get(conversationLocators.confirmDelete).click();
    }

    makeSureMoreDetailsIsClicked(){
        cy.get('.gap-2 > .button > .button__content').then(($button) => {
            const buttonText = $button.text().trim();
            if (buttonText === 'More details') {
                $button.click();
            }
        });    
    }
    makeSureConversationActionIsClicked(){
        cy.get('body').then(($body) => {
            if (!$body.find('.conversation-sidebar-wrap').is(':visible')) {
                cy.get('button h5').contains('Conversation Actions').click();
            }
        });
    }
    selectAssignAgentSelector(){
        cy.get(conversationLocators.assignAgentSelector).click();
    }
    selectAssignedSelf(){
        cy.get(conversationLocators.agentSelf).click();
    }
    selectAssignedNone(){
        cy.get(conversationLocators.agentNone).contains('None').click();
    }
    getCurrentUserName() {
        return cy.get(conversationLocators.currentConversationUserName)
          .should('exist')
          .invoke('text')
          .then(userNameText => {
            return userNameText.trim();
          });
      }
    checkAllConversationFetched(){
        cy.get(conversationLocators.allConversationLoaded).contains('All conversations loaded 🎉').should('exist');
    }
    checkUserIsInsideUnassigned(expectedUsername){
        cy.contains(expectedUsername).should('be.visible');
    }
}
export default AdminChat;
