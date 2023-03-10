import { URL_ORDER } from './constants/constants'
import {
	dataFetching,
	dataFetchingError,
	updateId
} from '../services/reducers/order-details-slice'
import NomorepartiesAuth from './constants/axios-auth'

export const postOrder = idS => async dispatch => {
	dispatch(dataFetching())
	try {
		const res = await NomorepartiesAuth.post(URL_ORDER, {
			ingredients: idS
		})
		console.log(res)
		const { name, order } = res.data
		dispatch(updateId({ name, id: order.number }))
	} catch (e) {
		console.log(e)
		dispatch(dataFetchingError())
	}
}
