import { IngredientType } from "../../../types/ingredients";

export function findIngredientIndexes(ingredient: IngredientType, array: IngredientType[]) {
    const indexes = array.map((item, index) => (item._id === ingredient._id ? index : null)).filter(index => index !== null);
    return { count: indexes.length, indexes };
};