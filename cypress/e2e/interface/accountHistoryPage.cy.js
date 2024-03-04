describe('Tela de Account History', () => {
  beforeEach(() => {
    const user = Cypress.env('user')
    const senha = Cypress.env('senha')

    cy.login(user, senha)
    cy.visit('bank/showAccount?listAccounts=800003')
  })

  it('Valida se as entradas de crédito estão com valores entre 0.01 e 99999999.99', () => {
    cy.get('#credits [align="right"]').each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .then(parseFloat)
        .should('be.gte', 0.01)
        .and('be.lte', 99999999.99)
    })
  })

  it('Valida se as entradas de débito estão com valores entre 0.01 e 99999990.99', () => {
    cy.get('#debits [align="right"]').each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .then(parseFloat)
        .should('be.gte', 0.01)
        .and('be.lte', 99999990.99)
    })
  })
})
