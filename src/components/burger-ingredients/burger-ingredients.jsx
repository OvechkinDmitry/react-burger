import React, {useCallback, useContext, useRef, useState} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientSection from "./ui/ingredient-section/ingredient-section";
import Tabs from "./ui/tabs/tabs";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ConstructorContext} from "../../services/constructor-context";
import {useDispatch, useSelector} from "react-redux";
import {setModalData} from "../../services/reducers/ingredient-details-slice";


const BurgerIngredients = () => {
    const {bun, main, sauce} = useContext(ConstructorContext)
    const [isOpen, setOpen] = useState(false)
    const handleClose = useCallback(() => setOpen(false), [])
    const dispath = useDispatch()
    const {data} = useSelector(state => state.ingredientDetailsReducer)
    const handleOpen = useCallback((data) => {
        dispath(setModalData(data))
        setOpen(true)
    }, [data])
    const refBun = useRef()
    const refSouces = useRef()
    const refMain = useRef()
    const tabsData = [{"title": "Булки", "ref": refBun},
        {"title": "Соусы", "ref": refSouces},
        {"title": "Начинки", "ref": refMain}]
    return (<div className={styles.container}>
                <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
                <Tabs names={tabsData}/>
                <div className={`${styles.ingredients} mt-10`}>
                    <IngredientSection ref={refBun} title={"Булки"} data={bun} handleOpen={handleOpen}/>
                    <IngredientSection ref={refSouces} title={"Соусы"} data={sauce} handleOpen={handleOpen}/>
                    <IngredientSection ref={refMain} title={"Начинки"} data={main} handleOpen={handleOpen}/>
                </div>
                {
                    isOpen && (<Modal optionalTitle={"Детали ингредиента"} handleClose={handleClose}>
                            <IngredientDetails/>
                    </Modal>)
                }
        </div>
    );
}

export default BurgerIngredients;