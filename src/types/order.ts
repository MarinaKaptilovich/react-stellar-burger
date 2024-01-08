import { IngredientType } from "./ingredients";
import { WebSocketOrder } from "./middleware";

export type OrderType = {
    name: string,
    success: boolean,
    order: {
        ingredients: IngredientType[],
        _id: string,
        owner: {
            name: string,
            email: string,
            createdAt: string,
            updatedAt: string
        },
        status: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        number: number,
        price: number
    }
};

export type OrderData = {
    name: string,
    order: {
        number: number | null
    },
    success: boolean,
    status: string,
    loaderActive: boolean
};

export type OrderProps = {
    order: WebSocketOrder
};