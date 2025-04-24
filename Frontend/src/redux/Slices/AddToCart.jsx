import { createSlice } from "@reduxjs/toolkit";

export const addToCart=createSlice({
    name:'AddToCart',
    initialState:{
        value:0
    },
    reducers:{
        updateValue:(state,action)=>{
            const currentValue=action.payload;
            state.value=currentValue;
        }
    }
})
export const {updateValue}=addToCart.actions;

export default addToCart.reducer;