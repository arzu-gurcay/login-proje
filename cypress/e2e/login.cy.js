import {errorMessages} from "../../src/components/Login";

describe('Login Page', () => {
  
  it('Email input throws error for arzu@gmail', () => {
    cy.visit('http://localhost:5173')
    cy.get("[data-cy='email-input']").type("arzu@gmail")
    cy.contains(errorMessages.email);
  });
   it('Password input throws error for 123456', () => {
    cy.visit('http://localhost:5173')
    cy.get("[data-cy='password-input']").type("123456")
    cy.contains(errorMessages.password);
  });
  it('Button is disabled for unvalidated inputs', () => {
    cy.visit('http://localhost:5173')
    cy.get("[data-cy='password-input']").type("123456")
    cy.get("[data-cy='submit-input']").should("be disabled")
    });
  it('Terms input throws error for unchecked', () => {
    cy.visit('http://localhost:5173')
    cy.get("[data-cy='terms-input']").check()
    cy.get("[data-cy='terms-input']").uncheck()
    cy.contains(errorMessages.terms)
    });
  it('Button is not disabled for validated 3 inputs', () => {
    cy.visit('http://localhost:5173')
    cy.get("[data-cy='email-input']").type("arzu@gmail.com")
    cy.get("[data-cy='password-input']").type("123456As.")
    cy.get("[data-cy='terms-input']").check()
    cy.get("[data-cy='submit-input']").should("not.be disabled")
    });
  it('Button clicking opens success open', () => {
    cy.visit('http://localhost:5173')
    cy.get("[data-cy='email-input']").type("arzu@gmail.com")
    cy.get("[data-cy='password-input']").type("123456As.")
    cy.get("[data-cy='terms-input']").check()
    cy.get("[data-cy='submit-input']").click();
    cy.url().should("include","/success");
    });
});
