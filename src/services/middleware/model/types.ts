import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload
} from '@reduxjs/toolkit'

export type TOrderItem = {
	_id: string
	ingredients: string[]
	status: string
	name: string
	createdAt: string
	updatedAt: string
	number: number
}

export type TOrders = {
	success: boolean
	orders: TOrderItem[]
	total: number
	totalToday: number
}

export type TwsActionsTypes = {
	wsInit: ActionCreatorWithPayload<string>
	wsClose: ActionCreatorWithoutPayload
	wsSendMessage?: ActionCreatorWithPayload<string>
	onOpen: ActionCreatorWithoutPayload
	onClose: ActionCreatorWithPayload<boolean>
	onError: ActionCreatorWithoutPayload
	onMessage: ActionCreatorWithPayload<any>
}
