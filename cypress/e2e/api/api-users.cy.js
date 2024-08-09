describe('API requests', () => {
  context('GET /users', () => {

    it('should return a list of users', () => {
      cy.request('GET', 'http://localhost:8000/users').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length.greaterThan(1);
      });
    });

  });

  context('GET /users/:userId', () => {

    it('should return a single user', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/users/1'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('nome');
      });
    });

    it('should return an error when user is invalid', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8000/users/2',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.equal('Not Found');
      });
    });

  });

  context('Intercepting network requests', () => {
    it('should intercept POST /users/login', () => {
      cy.intercept('POST', 'public/login', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Login bem sucedido!'
        }
      });

      cy.login('caue@almeida.com', new Date().getTime().toString());

      cy.visit('/home');
      cy.getByDataCy('titulo-boas-vindas').should('contain.text', 'Bem vindo de volta!');
    });
  });

  context('PUT method of users test', () => {
    it('should update user info successfully', () => {
      const usuario = {
        nome: 'Marcos Vinicius Neves',
        senha: '123456'
      };

      cy.request({
        method: 'PUT',
        url: 'http://localhost:8000/users/c691fd15-dcd5-4f24-89da-cdfa3cef9d67',
        body: usuario,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq(usuario.nome);
        expect(response.body.senha).to.eq(usuario.senha);
      });
    });

    it('should return forbidden status', () => {
      const usuario = {
        nome: 'Marcos Vinicius Neves',
        senha: '123456'
      };

      cy.request({
        method: 'PUT',
        url: 'http://localhost:8000/users/c691fd15-dcd5-4f24-89da-cdfa3cef9d67',
        body: usuario,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });

  context('Login via API', () => {
    it('should allow user Hello World to sign in', () => {
      cy.request({
        method: 'POST',
        url: `http://localhost:8000/users/login`,
        body: Cypress.env()
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body).is.not.empty;
        expect(response.body.user).to.have.property('nome');
        expect(response.body.user.nome).to.eq('Hello world');
      });
    })
  })
});
