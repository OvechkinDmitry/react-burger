import React, {useEffect} from 'react';
import styles from "./tabs.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {sectionsData} from "../../../../utils/global-prop-types";

function Tabs({sectionsData, sectionsRef}) {
    const [current, setCurrent] = React.useState("")
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
        sectionsData.forEach(el => {
            observer.observe(el['ref'].current)
        })
        return () => observer.disconnect();
    }, [current, sectionsData, sectionsRef])

    const handleClick = (title, anyRef) => {
        anyRef.current?.scrollIntoView({behavior: "smooth"})
        setCurrent(title)
    }
    return (<div className={styles.tabs}>
        {sectionsData.map(({title, ref}) =>
            <Tab
                key={title} value={title}
                active={current === title}
                onClick={() => handleClick(title, ref)}>
                {title}
            </Tab>)
        }
    </div>);
}

Tabs.propTypes = {
    sectionsData: sectionsData.isRequired,
    sectionRef: PropTypes.object
}

export default Tabs;