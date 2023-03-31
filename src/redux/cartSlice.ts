import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface productType {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    quantity: number;
}

const initialState= {
    cartItem: [] as productType[],
    cartOpen: false as boolean
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<productType>)=>{
            const newItemId = action.payload.id;
            const existingItem = state.cartItem.find(item => item.id === newItemId);
            if(existingItem){
                existingItem.quantity++
            }
            else{
               state.cartItem.push(action.payload)
            }
        },
        removeFromCart:(state,action:PayloadAction<number>)=>{
           state.cartItem = state.cartItem.filter(item => item.id !== action.payload)
        },
        incrementItem:(state,action:PayloadAction<number>)=>{
            state.cartItem = state.cartItem.map(item => {
                if (item.id === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },
        decrementItem:(state,action:PayloadAction<number>)=>{
            state.cartItem = state.cartItem.map(item => {
                if (item.id === action.payload) {
                    item.quantity--;
                }
                return item;
            }).filter(item => item.quantity !== 0);
        },
        toggleCart:(state, action:PayloadAction<boolean>) => {
            state.cartOpen = action.payload;
        },
        resetCart:(state) =>{
            state.cartItem = initialState.cartItem
        }
        }

})

export const { addToCart,removeFromCart,incrementItem,decrementItem, toggleCart, resetCart} = cartSlice.actions
export default cartSlice.reducer;

