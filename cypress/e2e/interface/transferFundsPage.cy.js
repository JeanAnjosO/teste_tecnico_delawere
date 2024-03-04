import moment from 'moment'

const numeroContaSavings = '800002'
const numeroContaDeposit = '800003'
const numeroContaCredit = '4539082039396288'
const dataAtual = moment().format('M/D/YY')

describe('Tela de Transfer Funds - Cenários positivos', () => {
  beforeEach(() => {
    const user = Cypress.env('user')
    const senha = Cypress.env('senha')

    cy.login(user, senha)
  })

  it('Verifica se a transação da conta Savings para conta Checking funciona corretamente - conta 800002 p/ 800003', () => {
    cy.preencheContasTransfer(0, 1, 200)
    cy.get('#transfer').click()

    cy.contains(
      '200.0 was successfully transferred from Account ' +
        numeroContaSavings +
        ' into Account ' +
        numeroContaDeposit +
        ' at ' +
        dataAtual,
    ).should('be.visible')
  })

  it('Verifica se a transação da conta Checking para conta Savings funciona corretamente - conta 800003 p/ 800002', () => {
    cy.preencheContasTransfer(1, 0, 500)
    cy.get('#transfer').click()

    cy.contains(
      '500.0 was successfully transferred from Account ' +
        numeroContaDeposit +
        ' into Account ' +
        numeroContaSavings +
        ' at ' +
        dataAtual,
    ).should('be.visible')
  })

  it('Verifica se a transação da conta Checking para conta Credit funciona corretamente - conta 800003 p/ 4539082039396288', () => {
    cy.preencheContasTransfer(1, 2, 500)
    cy.get('#transfer').click()

    cy.contains(
      '500.0 was successfully transferred from Account ' +
        numeroContaDeposit +
        ' into Account ' +
        numeroContaCredit +
        ' at ' +
        dataAtual,
    ).should('be.visible')
  })

  it('Verifica se a transação da conta Credit para conta Checking funciona corretamente - conta 4539082039396288 p/ 800003', () => {
    cy.preencheContasTransfer(2, 1, 1000)
    cy.get('#transfer').click()

    cy.contains(
      '1000.0 was successfully transferred from Account ' +
        numeroContaCredit +
        ' into Account ' +
        numeroContaDeposit +
        ' at ' +
        dataAtual,
    ).should('be.visible')
  })

  it('Verifica se a transação da conta Credit para conta Checking funciona corretamente - conta 4539082039396288 p/ 800002', () => {
    cy.preencheContasTransfer(2, 0, 1000)
    cy.get('#transfer').click()

    cy.contains(
      '1000.0 was successfully transferred from Account ' +
        numeroContaCredit +
        ' into Account ' +
        numeroContaSavings +
        ' at ' +
        dataAtual,
    ).should('be.visible')
  })

  it('Verifica se a transação da conta Credit para conta Checking funciona corretamente - conta 800002 p/ 4539082039396288', () => {
    cy.preencheContasTransfer(0, 2, 1000)
    cy.get('#transfer').click()

    cy.contains(
      '1000.0 was successfully transferred from Account ' +
        numeroContaSavings +
        ' into Account ' +
        numeroContaCredit +
        ' at ' +
        dataAtual,
    ).should('be.visible')
  })
})

describe('Tela de Transfer Funds - Cenários negativos', () => {
  beforeEach(() => {
    const user = Cypress.env('user')
    const senha = Cypress.env('senha')

    cy.login(user, senha)
  })

  it('Valida se não deixa fazer transferencia para a mesma conta', () => {
    cy.preencheContasTransfer(0, 0, 200)
    cy.get('#transfer').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(
        'From Account and To Account fields cannot be the same.',
      )
    })
  })

  it('Valida se não aceita transferência de valor negativo', () => {
    cy.preencheContasTransfer(0, 1, -200)
    cy.get('#transfer').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Transfer Amount must be a number greater than 0.')
    })
  })
})
