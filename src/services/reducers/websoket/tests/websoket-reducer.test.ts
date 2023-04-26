import websoketReducer, {
	TWebsoketState,
	wsClose,
	wsError,
	wsMessage,
	wsSuccess
} from '../lib/websoket-slice'
import { TOrderItem } from '../../../middleware/model/types'
import { testBun } from '../../../../utils/constants/constants'

const initialState: TWebsoketState = {
	wsConnected: false,
	orders: null,
	error: false
}

describe('websoket-reducer', () => {
	it('should make wsConnected field true when connection is success', () => {
		const action = { type: wsSuccess.type }
		const store = websoketReducer(initialState, action)
		expect(store).toEqual({ ...initialState, wsConnected: true })
	})

	it('should make wsError field false when connection there is an error', () => {
		const action = { type: wsError.type }
		const store = websoketReducer(
			{ ...initialState, wsConnected: true },
			action
		)
		expect(store).toEqual({ ...initialState, error: true })
	})

	it('should close connection with arriving error status and reset state', () => {
		const withErrorAction = { type: wsClose.type, payload: false }
		const store = websoketReducer(
			{ ...initialState, wsConnected: true },
			withErrorAction
		)
		expect(store).toEqual({ ...initialState, error: true })

		const withoutErrorAction = { type: wsClose.type, payload: true }
		const nextStore = websoketReducer(
			{ ...initialState, wsConnected: true },
			withoutErrorAction
		)
		expect(nextStore).toEqual({ ...initialState })
	})

	it('should get messages from websoket and save them into orders', () => {
		const payload = {
			success: true,
			orders: [testBun],
			total: 1,
			totalToday: 1
		}
		const action = {
			type: wsMessage.type,
			payload
		}

		const store = websoketReducer(initialState, action)
		expect(store).toEqual({ ...initialState, orders: payload })
	})
})
