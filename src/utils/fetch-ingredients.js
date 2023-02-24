import {NomorepartiesInstance} from "./constants";

export const fetchIngredients = async (URL, state, setState) => {
    try {
        setState({...state, hasError: false, isLoading: true})
        const {data} = await NomorepartiesInstance.get(URL)
        setState({...state, data: data.data, isLoading: false})
    } catch (err) {
        console.log(err)
        setState({...state, isLoading: false, hasError: true})
    }
}


