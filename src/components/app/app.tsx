import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {URL} from '../../utils/constants'
import {fetchIngredients} from "../../utils/fetch-ingredients";
import WarnLog from "../ui/warn-log/warn-log";
import ErrorBoundary from "../../hocs/error-boundary/error-boundary";

function App() {
    const [ingredients, setIngredients] = useState({
        hasError: false, isLoading: false, data: {},
    })
    useEffect(() => {
        fetchIngredients(URL, ingredients, setIngredients)
    }, [URL])
    const {hasError, isLoading, data} = ingredients
    return (
        <ErrorBoundary>
            <AppHeader/>
            <main className={styles.container}>
                {isLoading && <WarnLog>Загрузка...</WarnLog>}
                {hasError && <WarnLog>Ошибка</WarnLog>}
                {!hasError && !isLoading && Object.keys(data).length && (<>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </>)}
            </main>
        </ErrorBoundary>
    );
}

export default App;
