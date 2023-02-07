import React, {useMemo} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {data} from "../../utils/data";

function App() {
    const ingredients = useMemo(() => data.reduce((acc: any, el) => {
        if (el.type in acc)
            acc[el.type].push(el)
        else
            acc[el.type] = [el]
        return acc
    }, {}), [data])

    return (
        <div>
            <AppHeader/>
            <main className={styles.container}>
                <BurgerIngredients data={ingredients}/>
                <BurgerConstructor data={ingredients}/>
            </main>
        </div>
    );
}

export default App;
