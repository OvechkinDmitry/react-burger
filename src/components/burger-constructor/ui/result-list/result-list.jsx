import React, {useCallback} from 'react';
import Bun from "../bun/bun";
import ConstuctorList from "../constructor-list/constuctor-list";
import WarnLog from "../../../ui/warn-log/warn-log";
import {addBun, addConstructorElements, updateConstructorElements} from "../../../../services/reducers/burger-constructor-slice";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import styles from './result-list.module.css'

const ResultList = () => {
    const dispatch = useDispatch()
    const {constructorElements, bun} = useSelector(state => state.burgerConstructorReducer)
    const onDropHandler = (ingredient) => {
        if (ingredient.type !== 'bun')
            dispatch(addConstructorElements({'ingredient': ingredient}))
        else
            dispatch(addBun({'ingredient': ingredient}))
    }
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = constructorElements[dragIndex]
        const newCards = [...constructorElements]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)
        dispatch(updateConstructorElements({'ingredients': newCards}))
    },[constructorElements,dispatch])

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
                    <ConstuctorList data={[...constructorElements]} moveCard={moveCard}/>
                    <Bun isLocked={true} type={"bottom"} data={bun}/>
                </>
            ) : <WarnLog>Положите ингредиенты сюда</WarnLog>
        }
    </div>)
};

export default ResultList;