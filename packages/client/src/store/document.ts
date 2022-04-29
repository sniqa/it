import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { DocumentProps } from '@it/types'
import { WritableDraft } from 'immer/dist/internal'

const initialState: Array<DocumentProps> = []

export const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    getDocuments: (state, action) => {
      return state
    },
    putDocuments: (state, action) => {
      
      state = action.payload
      console.log(state);
      

    }


  }
})




export const { putDocuments } = documentSlice.actions

export default documentSlice.reducer