export type IngredientType = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    _v: number,
    key?: string
};

export type IngredientsData = {
    ingredients: IngredientType[] | null,
    hasError: boolean,
    loading: boolean
};

export type IngredientProps = {
    ingredientData: IngredientType
};

export type  IngredientDetailsType = {
    fullScrin: boolean
};
