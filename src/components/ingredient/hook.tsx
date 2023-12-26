import { IngredientType } from "../../types/ingredients";

export const getAmountOfIngredient = (ingredient: IngredientType, array: IngredientType[]) => {
    const amount = array.reduce((total, item) => {
      if (item._id === ingredient._id) {
        return total += 1
      }
      return total
    }, 0)
    return amount
};