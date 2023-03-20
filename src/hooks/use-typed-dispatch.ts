import { useDispatch } from 'react-redux'
import { TRootDispatch } from '../services'

export const useTypedDispatch = () => useDispatch<TRootDispatch>()
