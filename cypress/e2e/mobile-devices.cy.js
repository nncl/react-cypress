describe('MobileDevices spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate on mobile to Investments Page', () => {
    cy.viewport('iphone-6')

    // Login
    cy.getByDataCy('botao-login').click();
    cy.getByDataCy('email-input').type('hello2@world.com');
    cy.getByDataCy('senha-input').type('123456');
    cy.getByDataCy('botao-enviar').click();

    // Hamburguer menu opening
    cy.getByDataCy('menu-burguer').click();

    // Menu click
    cy.getByDataCy('menu-lateral').find('a').eq(3).click();

    cy.location('pathname').should('eq', '/home/investimentos')
  })
})
