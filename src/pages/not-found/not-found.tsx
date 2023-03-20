import React, { FC } from 'react'
import styles from './not-found.module.css'
import { Link } from 'react-router-dom'

const NotFound: FC = () => {
	return (
		<div className={styles.container}>
			<h1 className={`${styles.title} text text_type_main-large`}>404</h1>
			<Link to={'/'} className={`text text_type_main-medium text_color_accent`}>
				Вернуться назад
			</Link>
		</div>
	)
}

export default NotFound
