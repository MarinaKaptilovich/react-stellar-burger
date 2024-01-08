import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type WsConfigType = {
    onStart: string,
    onStop: string,
    onOpen: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<WebSocketPayload>,
    onClose: ActionCreatorWithPayload<string>,
    onError: ActionCreatorWithPayload<string>
};

export type WebSocketOrder = {
    _id: string,
    ingredients: string[],
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    owner?: string,
    __v: number
};

export type WebSocketData = {
    success: boolean,
    orders: WebSocketOrder[],
    total: number | null,
    totalToday: number | null,
    socketConnectionStatus: string | null
};

export type WebSocketPayload = {
    success: boolean,
    orders: WebSocketOrder[],
    total: number,
    totalToday: number
};