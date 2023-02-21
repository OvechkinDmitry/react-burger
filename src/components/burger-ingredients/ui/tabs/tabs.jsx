import React, {useEffect} from 'react';
import styles from "./tabs.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {arrayOf, object, shape, string} from "prop-types";

function Tabs({names, sectionsRef}) {
    const [current, setCurrent] = React.useState("Булки")
    useEffect(() => {
        console.log(sectionsRef)
        const options = {
            root : sectionsRef.ref,
        }
        const handleIntersection = (entries) => {
            const tabs = entries.reduce((acc, entry) => {
                    return {...acc, [entry.target.id]: entry.isIntersecting}
                }
                , {})
            const index = entries.findIndex(el => tabs[el.target.id])
            if (index >= 0)
                setCurrent(entries[index].target.id)
        }
        const observer = new IntersectionObserver(handleIntersection, options)
        names.forEach(el => {
            observer.observe(el.ref.current)
        })
    }, [current, names])
    const handleScroll = (title, anyRef) => {
        anyRef.current?.scrollIntoView({behavior: "smooth"})
        setCurrent(title)
    }
    return (<div className={styles.tabs}>
        {names.map(({title, ref}) =>
            <Tab
                key={title} value={title}
                active={current === title}
                onClick={() => handleScroll(title, ref)}>
                {title}
            </Tab>)
        }
    </div>);
}

Tabs.propTypes = {
    names: arrayOf(shape({
        title: string.isRequired,
        ref: object.isRequired,
    })),
}
export default Tabs;