import { IngredientType } from "../types/ingredients";

export const getIngredientsId = (array: IngredientType[]): string[] => {
    return array.filter((item) => item !== undefined).map((item) => item._id);
};

export function findIngredientById(array: IngredientType[], id: string) {
    return array.find((item) => item._id === id) as IngredientType
};