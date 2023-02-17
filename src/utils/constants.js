import axios from "axios";

export const NomorepartiesInstance = axios.create({
    baseURL: 'https://norma.nomoreparties.space/api/',
    timeout: 0,
    headers: {
        Accept: 'application/json',
    }
});


export const URL_INGREDIENTS = "/ingredients"
export const URL_ORDER = "/orders"