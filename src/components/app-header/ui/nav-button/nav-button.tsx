import React, { FC, ReactElement } from 'react'
import styles from './nav-button.module.css'
import { NavLink } from 'react-router-dom'

type TNavButton = {
	text: string
	children: ReactElement
	link: string
}

export const NavButton: FC<TNavButton> = ({ text, children, link }) => {
	return (
		<NavLink to={link} className={`${styles.navBtn} pl-5 pt-4 pb-4 pr-5`}>
			{({ isActive }) => (
				<>
					{isActive
						? children
						: React.cloneElement(children, { type: 'secondary' })}
					<p
						className={`text text_type_main-default ${
							isActive ? '' : 'text_color_inactive'
						} ml-2`}
					>
						{text}
					</p>
				</>
			)}
		</NavLink>
	)
}
