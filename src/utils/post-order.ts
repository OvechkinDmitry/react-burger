import { URL_ORDER } from './constants/constants'
import {
	dataFetching,
	dataFetchingError,
	updateId
} from '../services/reducers/order-details-slice'
import NomorepartiesAuth from './constants/axios-auth'
import { TRootDispatch } from '../services'

export const postOrder =
	(idS: Array<string>) => async (dispatch: TRootDispatch) => {
		dispatch(dataFetching())
		try {
			const res = await NomorepartiesAuth.post(URL_ORDER, {
				ingredients: idS
			})
			const { order } = res.data
			dispatch(updateId({ id: order.number }))
		} catch (e) {
			dispatch(dataFetchingError())
		}
	}
