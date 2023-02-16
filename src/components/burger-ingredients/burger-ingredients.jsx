import React, {useCallback, useContext, useRef, useState} from 'react';
import styles from './burger-ingredients.module.css'
import IngredientSection from "./ui/ingredient-section/ingredient-section";
import Tabs from "./ui/tabs/tabs";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ConstructorContext} from "../../services/constructor-context";


const BurgerIngredients = () => {
    const {bun, main, sauce} = useContext(ConstructorContext)
    const [isOpen, setOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const handleClose = useCallback(() => setOpen(false), [])
    const handleOpen = useCallback((data) => {
        setModalData(data)
        setOpen(true)
    }, [])
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
                        <IngredientDetails data={modalData}/>
                    </Modal>)
                }
        </div>
    );
}

export default BurgerIngredients;