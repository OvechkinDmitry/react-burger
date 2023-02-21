import React, {useEffect} from 'react';
import Bun from "../bun/bun";
import ConstuctorList from "../constructor-list/constuctor-list";
import WarnLog from "../../../ui/warn-log/warn-log";
import {updateBun, updateConstructorElements} from "../../../../services/reducers/burger-constructor-slice";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import styles from './result-list.module.css'

const ResultList = () => {
    const dispatch = useDispatch()
    const {constructorElements, bun} = useSelector(state => state.burgerConstructorReducer)
    const onDropHandler = (ingredient) => {
        if (ingredient.type !== 'bun')
            dispatch(updateConstructorElements({'ingredient': ingredient}))
        else
            dispatch(updateBun({'ingredient': ingredient}))
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            onDropHandler(ingredient)
        },
    });
    return (<div ref={dropTarget} className={`${styles.resultList}`}>
        {
            constructorElements.length || Object.keys(bun).length ? (
                <>
                    <Bun isLocked={true} type={"top"} data={bun}/>
                    <ConstuctorList data={[...constructorElements]}/>
                    <Bun isLocked={true} type={"bottom"} data={bun}/>
                </>
            ) : <WarnLog>Положите ингредиенты сюда</WarnLog>
        }
    </div>)
};

export default ResultList;