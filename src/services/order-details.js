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
    success: false,
    loaderActive: false
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
               return {
                ...state,
                loaderActive: true
               }
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                return {
                    ...state,
                    name: action.payload.name,
                    order: {
                        number: action.payload.order.number
                    },
                    status: 'loaded',
                    success: action.payload.success,
                    loaderActive: false
                }
            })
            .addCase(getOrder.rejected, (state) => {
                return {
                    ...initialState,
                    status: 'rejected'
                }
            })
    }
});

export const orderReducer = orderSlice.reducer;