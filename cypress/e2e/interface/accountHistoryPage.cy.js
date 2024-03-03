describe('Tela de Account History', () => {

    beforeEach(() => {
        const user = Cypress.env('user')
        const senha = Cypress.env('senha')

        cy.login(user, senha)  
    })
    
    
    it.only('Valida se as entradas de crédito estão com valores entre 0.01 e 99999999.99', () => { 
        
        cy.visit('bank/showAccount?listAccounts=800003')

        cy.get('#credits [align="right"]')
          .invoke('text')
          .then(parseFloat)
          .should('be.gte', 0.01)
          .and()
          .should('be.lte', 99999999.99)                  
    })
})