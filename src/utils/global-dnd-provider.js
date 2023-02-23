import React from 'react'
import PropTypes from 'prop-types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const GlobalDndProvider = props => {
	return (
		<DndProvider backend={HTML5Backend} key={1}>
			{props.children}
		</DndProvider>
	)
}

GlobalDndProvider.propTypes = {
	children: PropTypes.node
}

export default GlobalDndProvider
