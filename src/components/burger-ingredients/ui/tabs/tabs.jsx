import React from 'react';
import styles from "./tabs.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {arrayOf, string} from "prop-types";

function Tabs({names}) {
    const [current, setCurrent] = React.useState("Булки")
    const handleScroll = (title,anyRef) =>{
        setCurrent(title)
        anyRef.current?.scrollIntoView({behavior: "smooth"})
    }
    return (<div className={styles.tabs}>
        {names.map(({title, ref}) =>
            <Tab key={title} value={title} active={current === title} onClick={() => handleScroll(title,ref)}>
                {title}
            </Tab>)
        }
    </div>);
}

Tabs.propType = {
    names: arrayOf(string).isRequired
}
export default Tabs;