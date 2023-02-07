import React from 'react';
import styles from "./tabs.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

function Tabs({names}) {
    const [current, setCurrent] = React.useState("Булки")
    return (<div className={styles.tabs}>
        {names.map(title =>
            <Tab key={title} value={title} active={current === title} onClick={setCurrent}>
                {title}
            </Tab>)
        }
    </div>);
}

export default Tabs;