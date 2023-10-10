import { configureStore } from "@reduxjs/toolkit";
import { burgerReducer } from "./burger-constructor";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order-details";

export const store = configureStore({
    reducer: {
        burgerData: burgerReducer,
        ingredientsData: ingredientsReducer,
        modalData: modalReducer,
        orderData: orderReducer
    },
});