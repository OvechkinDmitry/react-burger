import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {URL} from '../../utils/constants'
import {fetchIngredients} from "../../utils/fetch-ingredients";
import Modal from "../modal/modal";

function App() {
    const [ingredients, setIngredients] = useState({
        hasError: false,
        isLoading: false,
        data: {},
    })

    useEffect(() => {
        fetchIngredients(URL, ingredients, setIngredients)
    }, [URL])

    const {hasError, isLoading, data} = ingredients

    return (
        <div>
            <Modal/>
            {/*<AppHeader/>*/}
            {/*<main className={styles.container}>*/}
            {/*    {isLoading && <div className={"text_type_main-large"} style={{margin: "10px auto"}}>ЗАГРУЗКА...</div>}*/}
            {/*    {hasError && <div className={"text_type_main-large"} style={{margin: "10px auto"}}>ОШИБКА</div>}*/}
            {/*    {!hasError && !isLoading && Object.keys(data).length && (<>*/}
            {/*        <BurgerIngredients data={data}/>*/}
            {/*        <BurgerConstructor data={data}/>*/}
            {/*    </>)}*/}
            {/*</main>*/}
        </div>
    );
}

export default App;
