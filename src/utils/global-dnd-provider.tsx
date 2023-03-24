import React, { FC, ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type TGlobalDndProvider = {
	children: ReactNode
}

export const GlobalDndProvider: FC<TGlobalDndProvider> = ({ children }) => {
	return (
		<DndProvider backend={HTML5Backend} key={1}>
			{children}
		</DndProvider>
	)
}

export default GlobalDndProvider
