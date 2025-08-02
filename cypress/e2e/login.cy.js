describe('Login Page', () => {
  describe('Error Messages', () => {
  it('email input throws error for arzu@gmail.', () => {
    cy.visit('http://localhost:5175/')
    cy.get("[data-cy=email-input]").type("arzu@gmail.")
    cy.contains("errorMessages.email");
  });
   it('Password input throws error for 123456', () => {
    cy.visit('http://localhost:5175/')
    cy.get("[data-cy=password-input]").type("123456")
    cy.contains("errorMessages.password");
  });
  it('Button is disabled for unvalidated inputs', () => {
    cy.visit('http://localhost:5175/')
    cy.get("[data-cy=password-input]").type("123456")
    cy.get("[data-cy=submit-input]").should("be disabled")
    });
});
});