import axios from "axios";

export const fetchIngredients = async (URL, ingredients, setIngredients) => {
    try{
        setIngredients({...ingredients, isLoading: true})
        let {data} = await axios.get(URL)
        let resultData = (data.data).reduce((acc, el) => {
            if (el.type in acc)
                acc[el.type].push(el)
            else
                acc[el.type] = [el]
            return acc
        }, {})
        setIngredients({...ingredients, data: resultData, isLoading: false})
    }
    catch (err){
        console.log(err)
        setIngredients({...ingredients, isLoading: false, hasError: true})
    }
}