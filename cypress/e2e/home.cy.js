describe('Home spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('passes', () => {
    cy.visit('http://localhost:3000')
  })

  it('should contain correct Advantages text', () => {
    cy.get('[data-cy="title-advantages"]').contains('Vantagens do nosso banco:')
  })
})
