import React from 'react';
import styles from './app-header.module.css'
import {Button, Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavButton} from "./ui/nav-button/nav-button";

const  AppHeader = (props) => {
    return (
        <>
           <header className={styles.header}>
                <div className={styles.headerContainer + " pt-4 pb-4"}>
                         <NavButton>
                             <BurgerIcon type="primary" />
                             <p className="text text_type_main-default ml-2">
                                 Конструктор
                             </p>
                         </NavButton>
                         <NavButton>
                             <ListIcon type="secondary" />
                             <p className="text text_type_main-default text_color_inactive ml-2">
                                 Лента заказов
                             </p>
                         </NavButton>
                    <div className={styles.logo}>
                        <Logo/>
                    </div>
                    <NavButton>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive ml-2">
                            Личный кабинет
                        </p>
                    </NavButton>
                </div>
           </header>
        </>
    );
}

export default AppHeader;