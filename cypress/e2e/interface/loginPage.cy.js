describe('Tela de login', () => {
    it('Valida login com credenciais válidas', () => {
        const user = Cypress.env('user')
        const senha = Cypress.env('senha')
        const options = { cacheSession: false }

        cy.login(user, senha, options)
        cy.contains('Hello John Smith').should('be.visible')
    })

    it('Valida login com credenciais inválidas', () => {
        const user = Cypress.env('invalidUser')
        const senha = Cypress.env('invalidSenha')
        const options = { cacheSession: false }

        cy.login(user, senha, options)
        cy.contains(`Login Failed: We're sorry, but this username or password was not found in our system. Please try again.`).should('be.visible')
    })
})