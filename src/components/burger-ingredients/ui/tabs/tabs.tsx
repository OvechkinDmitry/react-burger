import React, { FC, RefObject, useEffect } from 'react'
import styles from './tabs.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../../../utils/types/ingredient-type'

type TTabs = {
	sectionsData: Array<{
		title: string
		ref: RefObject<HTMLDivElement>
		ingredients: TIngredient[]
	}>
	sectionsRef: RefObject<HTMLDivElement>
}

const Tabs: FC<TTabs> = ({ sectionsData, sectionsRef }) => {
	const [current, setCurrent] = React.useState('')
	useEffect(() => {
		const options = {
			root: sectionsRef.current,
			rootMargin: '-110px'
		}
		const previousTabs = {}
		const handleIntersection = (entries: Array<object>) => {
			const tabs = entries.reduce((acc: any, entry: any) => {
				acc[entry.target.id] = entry.isIntersecting
				return acc
			}, previousTabs)
			for (const name in tabs) {
				if (tabs[name]) {
					setCurrent(name)
					break
				}
			}
		}
		const observer = new IntersectionObserver(handleIntersection, options)
		sectionsData.forEach(el => {
			observer.observe(el['ref'].current as HTMLDivElement)
		})
		return () => observer.disconnect()
	}, [current, sectionsData, sectionsRef])

	const handleClick = (title: string, anyRef: RefObject<HTMLDivElement>) => {
		anyRef.current?.scrollIntoView({ behavior: 'smooth' })
		setCurrent(title)
	}
	return (
		<div className={styles.tabs}>
			{sectionsData.map(({ title, ref }) => (
				<Tab
					key={title}
					value={title}
					active={current === title}
					onClick={() => handleClick(title, ref)}
				>
					{title}
				</Tab>
			))}
		</div>
	)
}

export default Tabs
