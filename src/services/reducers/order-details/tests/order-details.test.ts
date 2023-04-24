import orderDetailesReducer, {
	updateId,
	deleteId,
	dataFetching,
	dataFetchingError
} from '../lib/order-details-slice'
import { TOrderDetailsState } from '../model/types'

const initialState: TOrderDetailsState = {
	id: 0,
	isLoading: false,
	isError: false
}

describe('order-details', () => {
	it('should make loading field true when data is fetching', () => {
		const action = { type: dataFetching.type }
		const store = orderDetailesReducer(initialState, action)
		expect(store.isLoading).toBe(true)
	})

	it('should reset state and make error field true when fetch is rejected', () => {
		const action = { type: dataFetchingError.type }
		const store = orderDetailesReducer({ ...initialState, id: 1111 }, action)
		expect(store).toEqual({ ...initialState, isError: true })
	})

	it('should update id when order was made', () => {
		const action = { type: updateId.type, payload: { id: 1234 } }
		const store = orderDetailesReducer({ ...initialState, id: 2312 }, action)
		expect(store).toEqual({ ...initialState, id: 1234 })
	})

	it('should reset store when "deleteId" action is called', () => {
		const action = { type: deleteId.type }
		const store = orderDetailesReducer({ ...initialState, id: 2312 }, action)
		expect(store).toEqual(initialState)
	})
})
