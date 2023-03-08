import React from 'react'
import { NomorepartiesInstance, URL_TOKEN } from './constants/constants'

const refresh = async () => {
	return await NomorepartiesInstance.post(URL_TOKEN, {
		token: localStorage.getItem('refreshToken')
	})
}

export default refresh
