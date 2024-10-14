describe('CaptureForm Component', () => {
  let captureData;

  before(() => {
    // Load the fixture data
    cy.fixture('captureFormData').then((data) => {
      captureData = data;
    });
  });

  beforeEach(() => {
    // Set mobile view to close navbar
    cy.viewport('samsung-s10');
    cy.visit('localhost:3000/capture');
  });

  it('should enable the submit button when username and email are valid', () => {
    cy.get('input[name="username"]').type(captureData.validUser.username);
    cy.get('input[name="email"]').type(captureData.validUser.email);
    cy.get('input[name="password"]').type(captureData.validUser.password);

    cy.get('[data-cy=capture-button]')
      .should('not.be.disabled');
  });

  it('should keep the submit button disabled if the email is invalid', () => {
    cy.get('input[name="username"]').type(captureData.invalidUser.username);
    cy.get('input[name="email"]').type(captureData.invalidUser.email);
    cy.get('input[name="password"]').type(captureData.invalidUser.password);

    cy.get('[data-cy=capture-button]')
      .should('be.disabled');
  });

  it('should successfully submit the form and display a success toast', () => {
    cy.intercept('POST', '**/users').as('createUser');

    cy.get('input[name="username"]').type(captureData.validUser.username);
    cy.get('input[name="email"]').type(captureData.validUser.email);
    cy.get('input[name="password"]').type(captureData.validUser.password);

    cy.get('[data-cy=capture-button]').click();

    cy.wait('@createUser').its('request.body').should('deep.equal', {
      username: captureData.validUser.username,
      email: captureData.validUser.email,
      password: captureData.validUser.password,
    });

    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .and('contain.text', 'User captured successfully!');

    cy.get('input[name="username"]').should('have.value', '');
    cy.get('input[name="email"]').should('have.value', '');
    cy.get('input[name="password"]').should('have.value', '');
  });

  it('should display an error toast when form submission fails', () => {
    cy.intercept('POST', '**/users').as('createUserFail');

    cy.get('input[name="username"]').type(captureData.validUser.username);
    cy.get('input[name="email"]').type(captureData.validUser.email);
    cy.get('input[name="password"]').type(captureData.validUser.password);

    cy.get('[data-cy=capture-button]').click();

    cy.wait('@createUserFail');

    cy.get('.Toastify__toast--error')
      .should('be.visible')
      .and('contain.text', 'Failed to capture user.');

    cy.get('input[name="username"]').should('have.value', captureData.validUser.username);
    cy.get('input[name="email"]').should('have.value', captureData.validUser.email);
    cy.get('input[name="password"]').should('have.value', captureData.validUser.password);
  });
});
