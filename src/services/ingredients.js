import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../utils/api";

export const loadIngredients = createAsyncThunk(
    'loadIngredients',
    async() => {
        const res = await getIngredients();
        if (res && res.success) {
            return res.result;
        } else {
            throw new Error('Failed to fetch items');
        }
    }
);

const initialState = {
    ingredients: [],
    hasError: false,
    loading: false
};

export const ingredientsSlice = createSlice({
    name: 'ingredientsData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.fulfilled, (state, action) => {
                return {
                ...state,
                ingredients: action.payload,
                loading: false,
                hasError: false,
                };
            })
            .addCase(loadIngredients.pending, (state) => {
                return {
                ...state,
                loading: true,
                hasError: false,
                };
            })
            .addCase(loadIngredients.rejected, (state) => {
                return {
                ...state,
                loading: false,
                hasError: true,
                };
            });
      },
});

export const ingredientsReducer = ingredientsSlice.reducer;