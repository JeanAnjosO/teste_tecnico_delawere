Cypress.Commands.add('login', (
    user = Cypress.env('user'),
    senha = Cypress.env('senha'),
    { chacheSession = true } = {},
) => {
    cy.visit('login.jsp')

    cy.get('#uid').type(user)
    cy.get('#passw').type(senha)
    cy.get('[name="btnSubmit"]').click()
})