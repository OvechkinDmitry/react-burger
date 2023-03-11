import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import React, { useCallback } from 'react'
import { deleteModalData } from '../../services/reducers/ingredient-details-slice'
import { useDispatch } from 'react-redux'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Modal from '../modal/modal'

export const ModalSwitch = ({ background }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const handleClose = useCallback(() => {
		dispatch(deleteModalData())
		navigate(-1)
	}, [dispatch])

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
