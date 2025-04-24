import { createSlice } from "@reduxjs/toolkit";

export const HoverSlice=createSlice({
    name:'Hover',
    initialState:{
        
    },
    reducers:{
        ChangeState:(state,action)=>{
            const {id,value}=action.payload;
            state[id]=value;
        },
        DeleteState:(state,action)=>{
            const {id}=action.payload;
            delete state[id];
        }
    },
})

export const {ChangeState,DeleteState}=HoverSlice.actions;

export default HoverSlice.reducer;