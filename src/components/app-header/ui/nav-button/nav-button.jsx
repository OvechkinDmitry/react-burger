import React from 'react'
import styles from './nav-button.module.css'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export const NavButton = ({ text, children, link }) => {
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

NavButton.propType = {
	text: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	children: PropTypes.elementType.isRequired,
	link: PropTypes.string.isRequired
}
