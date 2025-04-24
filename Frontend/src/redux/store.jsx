import {configureStore} from '@reduxjs/toolkit'
import  HoverReducer  from './Slices/HoverSlice'
import addtocartReducer from './Slices/AddToCart'

export const store=configureStore({
    reducer:{
        Hover:HoverReducer,
        addToCart:addtocartReducer
    }
})
