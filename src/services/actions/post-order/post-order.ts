import { URL_ORDER } from '../../../utils/constants/constants'
import {
	dataFetching,
	dataFetchingError,
	updateId
} from '../../reducers/order-details/lib/order-details-slice'
import NomorepartiesAuth from '../../../utils/constants/axios-auth'
import { TRootDispatch } from '../../index'

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
