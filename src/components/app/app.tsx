import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import {URL_INGREDIENTS} from '../../utils/constants'
import ErrorBoundary from "../../hocs/error-boundary/error-boundary";
import withFetch from "../../hocs/with-fetch/with-fetch";
import Constructor from "../constructor/constructor";

function App() {
    const WithFetchConstructor = () => withFetch(Constructor, URL_INGREDIENTS)
    return (
        <ErrorBoundary>
            <AppHeader/>
            <main className={styles.container}>
                <WithFetchConstructor/>
            </main>
        </ErrorBoundary>
    );
}

export default App;
