import { Route, Routes, useNavigate } from 'react-router-dom'
import React, { useCallback } from 'react'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'

export const ModalSwitch = ({ background }) => {
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
