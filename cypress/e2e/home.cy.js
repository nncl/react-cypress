describe('HomePage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should contain correct Advantages text', () => {
    cy.getByDataCy('title-advantages').contains('Vantagens do nosso banco:')
  })
})
