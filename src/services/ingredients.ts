import { 
    createAsyncThunk,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { getIngredients } from "../utils/api";
import { 
    IngredientType,
    IngredientsData
} from "../types/ingredients";

export const loadIngredients = createAsyncThunk(
    'loadIngredients',
    getIngredients
);

const initialState: IngredientsData = {
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
            .addCase(loadIngredients.fulfilled, (state, action: PayloadAction<IngredientType[]>) => {
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