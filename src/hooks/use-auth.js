import React from 'react'
import { useSelector } from 'react-redux'

const UseAuth = () => {
	const store = useSelector(state => state.authUserReducer)
	return store
}

export default UseAuth
