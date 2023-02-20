import React, { useMemo} from 'react';
import Bun from "../bun/bun";
import ConstuctorList from "../constructor-list/constuctor-list";
import WarnLog from "../../../ui/warn-log/warn-log";
import {processConstructor} from "../../../../utils/process-data";
import { updateConstructorElements} from "../../../../services/reducers/burger-constructor-slice";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import styles from './result-list.module.css'

const ResultList = () => {
    const dispatch = useDispatch()
    const {constructorElements} = useSelector(state => state.burgerConstructorReducer)
    const {data} = useSelector(state => state.ingredientsReducer)
    const ingredientsData = useMemo(() => processConstructor(constructorElements), [constructorElements])
    const {bun, middle} = ingredientsData
    const onDropHandler = (itemId) => {
        dispatch(updateConstructorElements({'itemId': itemId, "data": data}))
    }
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId)
        },
    });
    return (<div ref={dropTarget} className={`${styles.resultList}`}>
                {
                    constructorElements.length ? (
                        <>
                            <Bun isLocked={true} type={"top"} data={bun}/>
                            <ConstuctorList data={[...middle]}/>
                            <Bun isLocked={true} type={"bottom"} data={bun}/>
                        </>
                    ) : <WarnLog>Положите ингредиенты сюда</WarnLog>
                }
            </div>)
};

export default ResultList;