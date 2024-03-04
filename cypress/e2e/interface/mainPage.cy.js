describe('Validação de acesso', () => {
  it('Valida acesso ao sistema', () => {
    cy.visit('/')
    cy.title().should('eq', 'Altoro Mutual')
  })
})
