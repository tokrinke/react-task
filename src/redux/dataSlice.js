import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [] 
    },
    reducers: {
        addData: (state, action)  => {
            state.data.push(action.payload);
        },
    }
})

export const { addData } = dataSlice.actions

export default dataSlice.reducer