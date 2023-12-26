import { 
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { 
    WebSocketData,
    WebSocketPayload
} from "../types/middleware";

export const feedWebSocketStart = 'FEED_WS_CONNECTION_START';
export const feedWebSocketStop = 'FEED_WS_CONNECTION_STOP';

const initialState: WebSocketData = {
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
        setFeed: (state, action: PayloadAction<WebSocketPayload>) => {
            state.success = action.payload.success
            state.orders = action.payload.orders
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
        },
        setFeedSocketConnectionStatus: (state, action: PayloadAction<string>) => {
            state.socketConnectionStatus = action.payload
        }
    }
});

export const {
    setFeed,
    setFeedSocketConnectionStatus
} = feedSlice.actions;
export const feedReducer = feedSlice.reducer;