import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../utils/api";

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
            .addCase(getIngredients.fulfilled, (state, action) => {
                return {
                ...state,
                ingredients: action.payload,
                loading: false,
                hasError: false,
                };
            })
            .addCase(getIngredients.pending, (state) => {
                return {
                ...state,
                loading: true,
                hasError: false,
                };
            })
            .addCase(getIngredients.rejected, (state) => {
                return {
                ...state,
                loading: false,
                hasError: true,
                };
            });
      },
});

export const ingredientsReducer = ingredientsSlice.reducer;