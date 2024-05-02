const locators = {
    openChatWindowButton: "button[title='Open chat window']",
    messageInput: "textarea.form-input"
};

class UserChat{
    openChatWindow() {
        cy.get(locators.openChatWindowButton).click();
    }

    typeMessage(message) {
        cy.get(locators.messageInput).type(message);
    }

    sendMessage() {

    }

    verifyErrorMessage(message) {
        
    }
}
export default UserChat;

