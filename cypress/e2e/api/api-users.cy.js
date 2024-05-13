describe('API requests', () => {
  context('GET /users', () => {
    it('should return a list of users', () => {
      cy.request('GET', 'http://localhost:8000/users').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length.greaterThan(1);
      });
    });
  });
})
