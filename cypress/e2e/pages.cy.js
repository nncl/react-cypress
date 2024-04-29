describe('Testing multiple pages', () => {
  it('should access card page', () => {
    cy.visit('/')
    cy.getByDataCy('botao-login').click();
    cy.getByDataCy('email-input').type('hello2@world.com')
    cy.getByDataCy('senha-input').type('123456')
    cy.getByDataCy('botao-enviar').click()

    cy.getByDataCy('app-home').find('a').eq(1).click();

    cy.getByDataCy('titulo-cartoes').should('exist').and('have.text', 'Meus cartões')
  })
})
