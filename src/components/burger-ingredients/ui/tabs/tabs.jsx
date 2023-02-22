import React, {useEffect} from 'react';
import styles from "./tabs.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {arrayOf, object, shape, string} from "prop-types";

function Tabs({names, sectionsRef}) {
    const [current, setCurrent] = React.useState("Булки")

    useEffect(() => {
        const options = {
            root: sectionsRef.current,
            rootMargin: '-110px',
        }
        const previousTabs = {}
        const handleIntersection = (entries) => {
            const tabs = entries.reduce((acc, entry) => {
                acc[entry.target.id] = entry.isIntersecting
                return acc
            }, previousTabs)
            for (const name in tabs) {
                if (tabs[name]) {
                    setCurrent(name);
                    break;
                }
            }
        };
        const observer = new IntersectionObserver(handleIntersection, options)
        names.forEach(el => {
            observer.observe(el['ref'].current)
        })
    }, [current, names, sectionsRef])

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