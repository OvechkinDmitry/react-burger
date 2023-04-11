import { createAction } from '@reduxjs/toolkit'
import {
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_START,
	WS_SEND_MESSAGE
} from '../action-types'

export const wsStart = createAction<string, typeof WS_CONNECTION_START>(
	WS_CONNECTION_START
)
export const wsSendMessage = createAction<any, typeof WS_SEND_MESSAGE>(
	WS_SEND_MESSAGE
)
export const wsDisconnect = createAction(WS_CONNECTION_CLOSED)
