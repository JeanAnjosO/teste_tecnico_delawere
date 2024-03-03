Cypress.Commands.add('login', (
    user = Cypress.env('user'),
    senha = Cypress.env('senha'),
) => {
    cy.visit('login.jsp')

    cy.get('#uid').type(user)
    cy.get('#passw').type(senha)
    cy.get('[name="btnSubmit"]').click()
})

Cypress.Commands.add('preencheContasTransfer', (indexFromAccount, indexToAccount, valueAmount) => {
    cy.visit('bank/transfer.jsp')
    cy.get('[action="doTransfer"]').should('contain', 'Transfer Funds')

    cy.get('#fromAccount').select(indexFromAccount)
    cy.get('#toAccount').select(indexToAccount)
    cy.get('#transferAmount').type(valueAmount)   
})