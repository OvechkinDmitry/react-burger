import {
	Route,
	Routes,
	useLocation,
	useNavigate,
	useParams
} from 'react-router-dom'
import React, { FC, useCallback, useMemo, useState } from 'react'
import Modal from '../modal/modal'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { useTypedSelector } from '../../hooks/use-typed-selector'

type TBackground = {
	pathname: string
	search: string
	hash: string
	state: null
	key: string
}

type TModalSwitch = {
	background: Partial<TBackground> | undefined
}
export const ModalSwitch: FC<TModalSwitch> = ({ background }) => {
	const navigate = useNavigate()
	const handleClose = useCallback<() => void>(() => {
		navigate(-1)
	}, [navigate])
	return (
		<>
			{background && (
				<Routes>
					<Route
						path={'/ingredients/:ingredientId'}
						element={
							<Modal
								optionalTitle={'Детали ингредиента'}
								handleClose={handleClose}
							>
								<IngredientDetails />
							</Modal>
						}
					></Route>
					<Route
						path={'/feed/:id'}
						element={
							<Modal handleClose={handleClose}>
								<IngredientDetails />
							</Modal>
						}
					></Route>
				</Routes>
			)}
		</>
	)
}
