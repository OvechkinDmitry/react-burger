import React, { useEffect, useMemo } from 'react';
import styles from "./burger-constructor.module.css"
import ConstuctorList from "./ui/constructorList/constuctor-list";
import Bun from "./ui/bun/bun";
import SubmitOreder from "./submit-order/submit-oreder";
import {processData} from "../../utils/process-data";
import {useDispatch, useSelector} from "react-redux";
import  {calculateTotalPrice} from "../../services/reducers/burger-constructor-slice";
import WarnLog from "../ui/warn-log/warn-log";


const BurgerConstructor = React.memo(({info = []}) => {
    const {isLoading, data} = useSelector(state => state.ingredientsReducer)
    const {totalPrice} = useSelector(state => state.burgerConstructorReducer)
    const dispatch = useDispatch()
    if (!isLoading)
        info = data
    const ingredientsData = useMemo(() => processData(info), [info])
    const {main, bun, sauce} = info.length ? ingredientsData :
        {'main': [], 'bun': [], 'sauce': [] }
    useEffect(() => {
            dispatch(calculateTotalPrice({'indgredients': [...main, ...bun.slice(1,1), ...sauce]}))
        },
        [main, bun, sauce])
    return( <div className={`${styles.container} mt-25`}>
                    <div className={`${styles.resultList}`}>
                        {
                            info.length ? (
                                <>
                                    <Bun isLocked={true} type={"top"} data={bun[0]}/>
                                    <ConstuctorList data={[...main, ...sauce]}/>
                                    <Bun isLocked={true} type={"bottom"} data={bun[0]}/>
                                </>
                            ) : <WarnLog>Положите ингредиенты сюда</WarnLog>
                        }
                    </div>
                <SubmitOreder totalPrice={totalPrice} ingredients={[bun, ...main, ...sauce]}/>
            </div>)
})

export default BurgerConstructor;