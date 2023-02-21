import {NomorepartiesInstance} from "../../utils/constants";
import {dataFetching, dataFetchingError, dataFetchingSuccess} from "../reducers/ingredints-slice";

export const fetchIngredients = (URL) => async (dispatch) => {
    try {
        dispatch(dataFetching())
        const {data} = await NomorepartiesInstance.get(URL)
        dispatch(dataFetchingSuccess({data: data.data}))
    }
    catch (err) {
        dispatch(dataFetchingError())
    }
}


