import React from 'react';
import styles from './nav-button.module.css'

export const NavButton = ({text, active, children}) => {
    const isActive = active ? "" : "text_color_inactive"
    return (<a href={"#"} className={`${styles.navBtn} pl-5 pt-4 pb-4 pr-5`}>
            {children}
            <p className={`text text_type_main-default ${isActive} ml-2`}>
                {text}
            </p>
        </a>
    );
};