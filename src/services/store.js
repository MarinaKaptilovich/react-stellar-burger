import { configureStore } from "@reduxjs/toolkit";
import { burgerReducer } from "./burger-constructor";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { orderReducer } from "./order-details";
import { ordersReducer } from "./orders";
import { feedReducer } from "./feed";
import { userReducer } from "./user";
import { socketMiddleware } from "./socketMiddleware";

export const store = configureStore({
    reducer: {
        burgerData: burgerReducer,
        ingredientsData: ingredientsReducer,
        modalData: modalReducer,
        orderData: orderReducer,
        ordersData: ordersReducer,
        feedData: feedReducer,
        userData: userReducer
    },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware)
});