import { NomorepartiesInstance, URL_ORDER } from './constants/constants'
import {
	dataFetching,
	dataFetchingError,
	updateId
} from '../services/reducers/order-details-slice'

export const postOrder = idS => async dispatch => {
	dispatch(dataFetching())
	try {
		const res = await NomorepartiesInstance.post(URL_ORDER, {
			ingredients: idS
		})
		const { name, order } = res.data
		dispatch(updateId({ name, id: order.number }))
	} catch (e) {
		dispatch(dataFetchingError())
	}
}
