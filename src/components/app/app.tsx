import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {URL} from '../../utils/constants'
import {fetchIngredients} from "../../utils/fetch-ingredients";
import WarnLog from "../ui/warn-log/warn-log";

function App() {
    const [ingredients, setIngredients] = useState({
        hasError: false,
        isLoading: false,
        data: {},
    })
    const [modalContent, setModalContent] = useState(null)

    useEffect(() => {
        fetchIngredients(URL, ingredients, setIngredients)
    }, [URL])

    const {hasError, isLoading, data} = ingredients
    const [isOpen, setOpen] = useState(false)

    const handleOpen = (data: any) => {
        setOpen(true)
        setModalContent(data)
    }
    const handleClose = () => setOpen(false)
    return (
        <div>
            <AppHeader/>
            <main className={styles.container}>
                {isLoading && <WarnLog>Загрузка...</WarnLog>}
                {hasError && <WarnLog>Ошибка</WarnLog>}
                {!hasError && !isLoading && Object.keys(data).length && (<>
                    <BurgerIngredients data={data} handleOpen={handleOpen} handleClose={handleClose}/>
                    <BurgerConstructor data={data} handleOpen={handleOpen} handleClose={handleClose}/>
                </>)}
            </main>
            {isOpen && modalContent}
        </div>
    );
}

export default App;
