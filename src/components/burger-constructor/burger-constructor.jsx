import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import styles from "./burger-constructor.module.css"
import ConstuctorList from "./ui/constructorList/constuctor-list";
import {ConstructorContext} from "../../services/constructor-context";
import Bun from "./ui/bun/bun";
import SubmitOreder from "./submit-order/submit-oreder";

const initialState = {totalPrice: 0};

function reducer(state, action) {
    switch (action.type) {
        case "calculatePrice": {
            const indgredients = action.payload
            const totalPrice = indgredients.reduce((acc, el) => {
                if (el.type === "bun")
                    return acc + el?.price * 2
                return acc + el?.price
            }, 0)
            return {...state, totalPrice}
        }
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

const BurgerConstructor = React.memo(() => {
    const data = useContext(ConstructorContext)
    const [state, dispatch] = useReducer(reducer, initialState);
    const constructorData = useMemo(() => {
        return {
            "main": data.main.slice(3),
            "bun": data.bun[0],
            "sauce": data.sauce.slice(8)
        }
    }, [data])
    const {bun, main, sauce} = constructorData
    useEffect(() => dispatch({type: "calculatePrice", payload: [...main, ...sauce, bun]}),
        [...main, ...sauce, bun])
    return (<div>
                <div className={`${styles.container} mt-25`}>
                    <Bun isLocked={true} type={"top"} data={bun}/>
                    <ConstuctorList data={[...main, ...sauce]}/>
                    <Bun isLocked={true} type={"bottom"} data={bun}/>
                    <SubmitOreder totalPrice={state.totalPrice} ingredients={[bun, ...main, ...sauce]}/>
                </div>
            </div>)
})

export default BurgerConstructor;