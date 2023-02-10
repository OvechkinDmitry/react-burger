import axios from "axios";

export const fetchIngredients = async (URL, state, setState) => {
    try{
        setState({...state, hasError: false, isLoading: true})
        let {data} = await axios.get(URL)
        setState({...state, data: data.data, isLoading: false})
    }
    catch (err){
        console.log(err)
        setState({...state, isLoading: false, hasError: true})
    }
}


