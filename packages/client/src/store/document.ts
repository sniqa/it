import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { DocumentProps } from '@it/types'

const initialState: Array<DocumentProps> = []

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {}
})

export const { } = documentSlice.actions

export default documentSlice.reducer