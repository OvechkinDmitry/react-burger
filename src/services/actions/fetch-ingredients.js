import { NomorepartiesInstance } from '../../utils/constants/constants'
import {
	dataFetching,
	dataFetchingError,
	dataFetchingSuccess
} from '../reducers/ingredints-slice'

export const fetchIngredients = URL => async dispatch => {
	try {
		dispatch(dataFetching())
		const { data } = await NomorepartiesInstance.get(URL)
		dispatch(dataFetchingSuccess({ ingredients: data.data }))
	} catch (err) {
		dispatch(dataFetchingError())
	}
}
