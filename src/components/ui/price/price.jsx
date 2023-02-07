import React from 'react';
import styles from './price.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Price({text, size, extraClass}) {
    return (
            <div className={`${styles.price} ${extraClass}`}>
                <span className={`text text_type_digits-${size}`}>{text}</span>
                <CurrencyIcon type="primary-medium"/>
            </div>
    );
}

export default Price;