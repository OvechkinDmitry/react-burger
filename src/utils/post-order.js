import axios from "axios";
import {URL_ORDER} from "./constants";

export const postOrder = async (idS) => {
    try{
        const res = await axios.post(URL_ORDER, {"ingredients": idS})
        if(res.status === 200){
            const {name, order} = res.data
            return {name, id: order.number}
        }
    }
    catch (e){
        console.log(`Ошибка:${e}`)
    }
}