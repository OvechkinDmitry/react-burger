import React from 'react';
import styles from './nav-button.module.css'

export const NavButton = (props) => {
    return (
        <div className={styles.navBtn + " pl-5 pt-4 pb-4 pr-5"}>
            {props.children}
        </div>
    );
};