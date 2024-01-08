import { 
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { IngredientType } from '../types/ingredients';
import { 
  BurgerType,
  SortFilling
} from '../types/burger';

const initialState: BurgerType = {
  bun: [],
  fillings: []
}

export const burgerSlice = createSlice({
  name: 'burgerData',
  initialState,
  reducers: {
    addFilling: {
      reducer: (state, action: PayloadAction<IngredientType>) => {
        return {
          ...state,
          fillings: [
            ...state.fillings,
            action.payload
          ]
        }
      },
      prepare: (item: IngredientType) => {
        const key = nanoid()
        return {
          payload: {
            ...item,
            key: key
          }
        }
      }
    }, 
    addBun: {
      reducer: (state, action: PayloadAction<IngredientType>) => {
        if (!(state.bun.length > 0)) {
          return {
            ...state, 
            bun: [
              action.payload
            ]
          }
        }
        else {
          if ('_id' in state.bun && state.bun._id === action.payload._id) {
            return {
              ...state
            };
          }
          else {
            return {
              ...state, 
              bun: [
                action.payload
              ]
            };
          }  
        }
      },
      prepare: (item: IngredientType) => {
        const key = nanoid()
        return {
          payload: {
            ...item,
            key: key
          }
        }
      }
    },
    deleteFilling: (state, action: PayloadAction<IngredientType>) => {
      return {
        ...state,
        fillings: state.fillings.filter(item => item.key !== action.payload.key),
      }
    },
    sortFilling: (state, action: PayloadAction<SortFilling>) => {

      const fillings = [...state.fillings]
      fillings.splice(
        action.payload.dropIndex,
        0,
        fillings.splice(action.payload.dragIndex, 1)[0] 
      )
      return {
        ...state,
        fillings: fillings,
      }
    },
  },
})

export const burgerActions = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;