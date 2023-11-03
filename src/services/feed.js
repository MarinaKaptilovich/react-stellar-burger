import { createSlice } from "@reduxjs/toolkit";

export const feedWebSocketStart = 'FEED_WS_CONNECTION_START';
export const feedWebSocketStop = 'FEED_WS_CONNECTION_STOP';

const initialState = {
    success: false,
    orders: [],
    total: null,
    totalToday: null,
    socketConnectionStatus: null
};

export const feedSlice = createSlice({
    name: 'feedData',
    initialState,
    reducers: {
        setFeed: (state, action) => {
            state.success = action.payload.success
            state.orders = action.payload.orders
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
        },
        setFeedSocketConnectionStatus: (state, action) => {
            state.socketConnectionStatus = action.payload
        }
    }
});

export const feedAction = feedSlice.actions;
export const feedReducer = feedSlice.reducer;