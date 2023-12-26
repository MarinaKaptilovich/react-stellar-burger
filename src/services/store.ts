import { 
    configureStore,
    combineReducers
} from "@reduxjs/toolkit";
import { burgerReducer } from "./burger-constructor";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order-details";
import { ordersReducer } from "./orders";
import { feedReducer } from "./feed";
import { userReducer } from "./user";
import { socketMiddleware } from "./socketMiddleware";
import { 
    setOrders,
    setOrdersSocketConnectionStatus,
    ordersWebSocketStart,
    ordersWebSocketStop
} from "./orders";
import { 
    setFeed,
    setFeedSocketConnectionStatus,
    feedWebSocketStart,
    feedWebSocketStop
} from "./feed";

export const rootReduser = combineReducers({
    burgerData: burgerReducer,
    ingredientsData: ingredientsReducer,
    orderData: orderReducer,
    ordersData: ordersReducer,
    feedData: feedReducer,
    userData: userReducer
})

export const store = configureStore({
    reducer: rootReduser,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(socketMiddleware({
            onStart: feedWebSocketStart,
            onStop: feedWebSocketStop,
            onOpen: setFeedSocketConnectionStatus,
            onMessage: setFeed,
            onClose: setFeedSocketConnectionStatus,
            onError: setFeedSocketConnectionStatus,
        }), 
        socketMiddleware({
            onStart: ordersWebSocketStart,
            onStop: ordersWebSocketStop,
            onOpen: setOrdersSocketConnectionStatus,
            onMessage: setOrders,
            onClose: setOrdersSocketConnectionStatus,
            onError: setOrdersSocketConnectionStatus,
        }))  
});
