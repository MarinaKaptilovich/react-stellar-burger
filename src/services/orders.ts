import { 
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {  
    WebSocketData,
    WebSocketPayload
} from "../types/middleware";

export const ordersWebSocketStart = 'PROFILE_ORDERS_WS_CONNECTION_START';
export const ordersWebSocketStop = 'PROFILE_ORDERS_WS_CONNECTION_STOP';

const initialState: WebSocketData = {
    success: false,
    orders: [],
    total: null,
    totalToday: null,
    socketConnectionStatus: null
};

export const ordersSlice = createSlice({
    name: 'ordersData',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<WebSocketPayload>) => {
            state.success = action.payload.success;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        setOrdersSocketConnectionStatus: (state, action: PayloadAction<string>) => {
            state.socketConnectionStatus = action.payload;
        },
    },
});

export const {
    setOrders,
    setOrdersSocketConnectionStatus
} = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;