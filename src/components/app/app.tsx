import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../../hocs/error-boundary/error-boundary";
import Constructor from "../constructor/constructor";

function App() {
    return (
        <ErrorBoundary>
            <AppHeader/>
            <main className={styles.container}>
                <Constructor/>
            </main>
        </ErrorBoundary>
    );
}

export default App;
