import { STORE_ADRESS } from '../../src/utils/constants/constants'

describe('burger-constructor-page', () => {
	beforeEach(() => {
		cy.visit(`${STORE_ADRESS}/`)
	})

	it('should open modal when click on every ingredient', () => {
		cy.get('[data-cy="ingredient"]').first().click()
		cy.url().should('include', '/ingredients')
		cy.get('[data-cy="close-modal"]').click()
		cy.location().should(loc => expect(loc.href).to.eq(`${STORE_ADRESS}/`))
	})

	it('order button should be disabled when constructor is empty', () => {
		cy.get('[data-cy="order-price"]').then(price => {
			if (Number(price[0].innerText) <= 0)
				cy.get('[data-cy="order-button"]').should('be.disabled')
			else cy.get('[data-cy="order-button"]').should('not.be.disabled')
		})
	})

	it('should drag ingredient to constructor', () => {
		cy.visit(`${STORE_ADRESS}/login`)
		cy.get('[data-cy="login-email"]').type('ovechkin_dima03@mail.ru')
		cy.get('[data-cy="login-password"]').type('123123')
		cy.get('[data-cy="login-button"]').click()
		cy.location().should(loc => expect(loc.href).to.eq(`${STORE_ADRESS}/`))
		const dataTransfer = new DataTransfer()
		cy.get('[data-cy="ingredient"]').first().trigger('dragstart', {
			dataTransfer
		})
		cy.get('[data-cy="drop-area"]').trigger('drop', {
			dataTransfer
		})
		cy.get('[data-cy="order-button"]').click()
		cy.wait(15000) //ожидание формирования заказа
		cy.get('[data-cy="order-details"]').should('exist')
		cy.get('[data-cy="close-modal"]').click()
	})
})
