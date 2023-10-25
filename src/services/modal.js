import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredient: {}
};

export const modalSlice = createSlice({
    name: 'modalData',
    initialState,
    reducers: {
        setModalIngredient: (state, action) => {
            state.ingredient = action.payload
        }
    }
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
