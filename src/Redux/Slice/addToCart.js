import { createSlice } from '@reduxjs/toolkit'



export const addToCartSlice = createSlice({
    name: 'counter',
    initialState: {
        items: [],  // cart items
        totalAmount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            let newItem = action.payload.data;

            if (state.items.length > 0 && state.items[0].selectRestaurant !== newItem.selectRestaurant) {
                return alert("Aik waqt me sirf aik hi restaurant se order place ho sakta hai. Pahle wale order ko complete karein.")
            }

            let exitingData = state.items.find(item => item._id === newItem._id);

            if (exitingData) {
                exitingData.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }

            state.totalAmount = state.items.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);
        },
        incer: (state, action) => {
            let id = action.payload
            console.log("paylod hon me", id)
            let item = state.items.find(i => i._id === id)
            if (item) {
                console.log("sd")
                item.quantity += 1
            }
            state.totalAmount = state.items.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);
        },
        dcer: (state, action) => {
            let id = action.payload
            console.log("s")
            let item = state.items.find(i => i._id === id)

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                } else {
                    state.items = state.items.filter(i => i._id !== id)
                }
            }
            state.totalAmount = state.items.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);
        },
        removeItem :(state) =>{
            state.items = []
            state.totalAmount = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, incer , dcer, removeItem} = addToCartSlice.actions
let addToCartSliceDATA = addToCartSlice.reducer
export default addToCartSliceDATA