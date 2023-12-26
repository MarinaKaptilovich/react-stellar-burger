import { IngredientType } from "./ingredients";

export type BurgerType = {
    bun: IngredientType[],
    fillings: IngredientType[]
};

export type SortFilling = {
    dragIndex: number,
    dropIndex: number
};
