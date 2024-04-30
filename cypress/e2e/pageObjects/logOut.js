const locators = {
    profileSetting:"button .user-thumbnail-box"
}

class Logout{
    logout(){
        cy.get(locators.profileSetting).should('is.visible');
        cy.get(locators.profileSetting).click();
        cy.get('span').contains('Logout').click();
    }
}
export default Logout;
