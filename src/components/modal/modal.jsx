import React from 'react';
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetailes from "../order-details/order-detailes";

function Modal() {
    return (
        <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
            <div className={styles.header}>
                <p className="text text_type_main-large">
                    Детали заказа
                </p>
                <CloseIcon type="primary" />
            </div>
            <div className={`${styles.body}`}>
                <OrderDetailes/>
            </div>
        </div>
    );
}

export default Modal;