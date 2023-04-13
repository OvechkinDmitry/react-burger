import { Route, Routes, useNavigate } from 'react-router-dom'
import React, { FC, useCallback } from 'react'
import Modal from '../modal/modal'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { OrderInfo } from '../order-info/order-info'
import { ProtectedRouteElement } from '../protectedRoute/protected-route-element'

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
								<OrderInfo />
							</Modal>
						}
					></Route>
					<Route
						path={'/profile/orders/:id'}
						element={
							<Modal handleClose={handleClose}>
								<ProtectedRouteElement element={<OrderInfo />} />
							</Modal>
						}
					></Route>
				</Routes>
			)}
		</>
	)
}
