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
	onClose: ActionCreatorWithPayload<any>
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
					console.log('open')
					dispatch(onOpen())
				}
				soket.onclose = event => {
					console.log(event)
					dispatch(onClose(event.wasClean))
					soket = null
				}
				soket.onerror = event => {
					console.log('error')
					console.log(event)
					dispatch(onError())
				}
				soket.onmessage = event => {
					console.log('message')
					const data = JSON.parse(event.data)
					console.log(data)
					if (data.success) dispatch(onMessage(data))
					else dispatch(onError())
				}
				if (wsSendMessage?.match(action)) {
					console.log(wsSendMessage, action)
					soket.send(JSON.stringify(action.payload))
				}
				if (wsClose.match(action)) {
					soket.close()
					// dispatch(onClose())
				}
			}
			next(action)
		}
	}
