import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {URL} from '../../utils/constants'
import {fetchIngredients} from "../../utils/fetch-ingredients";

function App() {
    const [ingredients, setIngredients] = useState({
        isLoading: false,
        data: {}
    })

    useEffect(() => {
        fetchIngredients(URL, ingredients, setIngredients)
    }, [URL])

    const {isLoading, data} = ingredients

    return (
        <div>
            <AppHeader/>
            <main className={styles.container}>
                {!isLoading && Object.keys(data).length && (<>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </>)}
            </main>
        </div>
    );
}

export default App;
