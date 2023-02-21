import {NomorepartiesInstance} from "../../utils/constants";
import {dataFetching, dataFetchingError, dataFetchingSuccess} from "../reducers/ingredints-slice";

export const fetchIngredients = (URL) => async (dispatch) => {
    try {
        dispatch(dataFetching())
        const {data} = await NomorepartiesInstance.get(URL)
        // console.log(data.data.map(el => {
        //     return {'taken': 0, 'data': el}
        // }))
        dispatch(dataFetchingSuccess({data: data.data}))
        // dispatch(dataFetchingSuccess({data: data.data.map(el => {
        //             return {'taken': 0, 'data': el}
        //         })
        // }))
    }
    catch (err) {
        dispatch(dataFetchingError())
    }
}


