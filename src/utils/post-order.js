import {NomorepartiesInstance, URL_ORDER} from "./constants";

export const postOrder = async (idS) => {
    const res = await NomorepartiesInstance.post(URL_ORDER, { ingredients: idS });
    if (res.status === 200) {
        const { name, order } = res.data;
        return { name, id: order.number };
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
};
