import { createSlice } from '@reduxjs/toolkit'



export const restaurnatDataSlice = createSlice({
    name: 'counter',
    initialState: {
        rest: [],  // cart items
    },
    reducers: {
        restdata: (state, action) => {
            let data = action.payload
            state.rest = data
        }
    }
})

// Action creators are generated for each case reducer function
export const { restdata } = restaurnatDataSlice.actions
let restaurantData = restaurnatDataSlice.reducer
export default restaurantData