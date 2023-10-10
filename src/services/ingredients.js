import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
    hasError: false,
    errorMessage: ''
};

export const ingredientsSlice = createSlice({
    name: 'ingredientsData',
    initialState,
    reducers: {
        setIngredients: (state, action) => {
            state.ingredients = action.payload
        },
        setError: (state, action) => {
            state.hasError = action.payload.hasError
            state.errorMessage = action.payload.errorMessage
        }
    },
});

export const ingredientsAction = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;