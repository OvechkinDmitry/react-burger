import { Route, Routes, useNavigate } from 'react-router-dom'
import React, { FC, useCallback } from 'react'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'

//если пишешь не те поля не пишет ошибки
type TBackground = {
	pathname: string
	search: string
	hash: string
	state: null
	key: string
}

type TModalSwitch = {
	background: TBackground | undefined
}
export const ModalSwitch: FC<TModalSwitch> = ({ background }) => {
	const navigate = useNavigate()
	const handleClose = useCallback(() => {
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
				</Routes>
			)}
		</>
	)
}
