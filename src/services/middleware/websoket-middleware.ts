import { Middleware } from 'redux'
import { TRootState } from '../index'
import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload
} from '@reduxjs/toolkit'

export type TwsActionsTypes = {
	wsInit: ActionCreatorWithPayload<string>
	wsClose: ActionCreatorWithoutPayload
	wsSendMessage?: ActionCreatorWithPayload<any>
	onOpen: ActionCreatorWithoutPayload
	onClose: ActionCreatorWithoutPayload
	onError: ActionCreatorWithoutPayload
	onMessage: ActionCreatorWithPayload<any>
}

export const websoketMiddleware =
	(wsActions: TwsActionsTypes): Middleware<{}, TRootState> =>
	store => {
		let soket: WebSocket | null = null
		return next => action => {
			const { dispatch } = store
			const {
				wsInit,
				wsClose,
				wsSendMessage,
				onClose,
				onMessage,
				onOpen,
				onError
			} = wsActions
			if (wsInit.match(action)) {
				console.log('connect', wsInit.match(action), action.payload)
				soket = new WebSocket(action.payload)
			}
			if (soket) {
				soket.onopen = event => {
					dispatch(onOpen())
				}
				soket.onclose = event => {
					dispatch(onClose())
				}
				soket.onerror = event => {
					dispatch(onError())
				}
				soket.onmessage = event => {
					console.log(JSON.parse(event.data))
					dispatch(onMessage(JSON.parse(event.data)))
				}
				if (wsSendMessage?.match(action)) {
					console.log(wsSendMessage, action)
					soket.send(JSON.stringify(action.payload))
				}
				if (wsClose.match(action)) {
					console.log(wsClose.match(action))
					soket.close()
					dispatch(onClose())
				}
			}
			next(action)
		}
	}
