import { 
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import { requestGetOrderWithRefresh } from "../utils/api";

const getIngredientsId = (array) => {
    return array.filter(item => item).map(item => item._id);
};

const initialState = {
    name: '',
    order: {
        number: null
    },
    status: '',
    success: false
};

export const getOrder = createAsyncThunk(
    'getOrderData',
    async (ingredients) => {
        const ingredientsId = getIngredientsId(ingredients);
        const orderData = await requestGetOrderWithRefresh(ingredientsId);
        return orderData;
    }
);

export const orderSlice = createSlice({
    name: 'orderData',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                return {
                    ...state,
                    name: action.payload.name,
                    order: {
                        number: action.payload.order.number
                    },
                    status: 'loaded',
                    success: action.payload.success
                }
            })
            .addCase(getOrder.rejected, (state) => {
                return {
                    ...state,
                    name: '',
                    order: {
                        number: null
                    },
                    status: 'rejected',
                    success: false
                }
            })
    }
});

export const orderReducer = orderSlice.reducer;