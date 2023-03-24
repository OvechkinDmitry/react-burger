import { NomorepartiesInstance } from '../../../../utils/constants/constants'
import {
	dataFetching,
	dataFetchingError,
	dataFetchingSuccess
} from '../../../reducers/ingredints-slice'
import { TRootDispatch } from '../../../index'

export const fetchIngredients =
	(URL: string) => async (dispatch: TRootDispatch) => {
		try {
			dispatch(dataFetching())
			const { data } = await NomorepartiesInstance.get(URL)
			dispatch(dataFetchingSuccess({ ingredients: data.data }))
		} catch (err) {
			dispatch(dataFetchingError())
		}
	}
