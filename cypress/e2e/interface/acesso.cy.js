describe('Teste técnico Delawere', () => {
    it('Teste acesso ao sistema', () => {
        cy.visit('/')
        cy.title().should('eq', 'Altoro Mutual')
    })
})