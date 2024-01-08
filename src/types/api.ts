import { IngredientType } from "./ingredients";
import { UserType } from "./user";
import { WebSocketOrder } from "./middleware";

export type RequestRefreshTokenType ={
    success: boolean,
    accessToken: string,
    refreshToken:string
};

export type RequestGetIngredienceType = {
    success: boolean,
    data: IngredientType[]
};

export type RequestUserType = {
    success: boolean,
    user: UserType,
    accessToken: string,
    refreshToken: string
};

export type RequestRefreshUserInfoType = {
    success: boolean,
    message: string
};
  
export type RequestGetUserType = {
    success: true,
    user: UserType
};
  
export type RequestGetOrderType = {
    success: true,
    orders: WebSocketOrder[]
};