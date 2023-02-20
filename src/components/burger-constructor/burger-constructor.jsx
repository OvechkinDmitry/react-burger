import React from 'react';
import styles from "./burger-constructor.module.css"
import SubmitOreder from "./submit-order/submit-oreder";
import {useSelector} from "react-redux";
import ResultList from "./ui/result-list/result-list";


const BurgerConstructor = React.memo(({info = []}) => {
    const {totalPrice} = useSelector(state => state.burgerConstructorReducer)
    return( <div className={`${styles.container} mt-25`}>
                <ResultList/>
                <SubmitOreder totalPrice={totalPrice} ingredients={[]}/>
            </div>)
})

export default BurgerConstructor;