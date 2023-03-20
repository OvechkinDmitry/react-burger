import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { TRootState } from '../services'

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector
