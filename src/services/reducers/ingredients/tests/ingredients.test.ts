import { TIngredientsState } from '../model/types'
import ingredintsReducer, {
	dataFetching,
	dataFetchingError,
	dataFetchingSuccess
} from '../lib/ingredints-slice'
import { testBun } from '../../../../utils/constants/constants'

const initialState: TIngredientsState = {
	ingredients: [],
	isLoading: false,
	isError: false
}

describe('ingredients', () => {
	it('should make loading field true when data is fetching', () => {
		const action = { type: dataFetching.type }
		const store = ingredintsReducer(initialState, action)
		expect(store.isLoading).toBe(true)
	})

	it('should update state on success with ingredients', () => {
		const action = {
			type: dataFetchingSuccess.type,
			payload: { ingredients: [testBun] }
		}
		const store = ingredintsReducer(
			{ ...initialState, isLoading: true },
			action
		)
		expect(store).toEqual({ ...initialState, ingredients: [testBun] })
	})

	it('should make error field true when fetch was rejected', () => {
		const action = { type: dataFetchingError.type }
		const store = ingredintsReducer(initialState, action)
		expect(store.isError).toBe(true)
	})
})
