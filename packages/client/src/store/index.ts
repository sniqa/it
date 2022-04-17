import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
	reducer: {},
})

type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch

export const useAppdispatch = () => useDispatch<AppDispatch>()

export default store
