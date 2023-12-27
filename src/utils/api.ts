import { IngredientType } from "../types/ingredients";
import { OrderType } from "../types/order";
import { 
  RequestRefreshTokenType,
  RequestUserType,
  RequestRefreshUserInfoType,
  RequestGetUserType,
  RequestGetOrderType
} from "../types/api";
import { ChangeUserType } from "../types/user"; 

const BASE_URL = 'https://norma.nomoreparties.space/api';

const api = {
  ingredientsUrl: 'https://norma.nomoreparties.space/api/ingredients',
  orderUrl: 'https://norma.nomoreparties.space/api/orders'
};

function checkResult(res:Response) {
  return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};

function request<T>(url: string, params: RequestInit) : Promise<T> {
  return fetch(url, params)
    .then(res => {
      if(!res.ok) {
        return Promise.reject(`Ошибка`);
      }
      return res.json() as Promise<T>
    })
};

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('authorization', localStorage.getItem('accessToken') ?? 'Error');

export async function getIngredients() : Promise<IngredientType[]> {
  const res = await fetch(api.ingredientsUrl)
  const result = await checkResult(res)
  return result.data
};

export function createOrder(ingredients:string[]) {
  return request<OrderType>(api.orderUrl, {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: headers
  });
};

export function getOrder(number: string) {
  return request<RequestGetOrderType>(`${api.orderUrl}/${number}`, { 
    method: 'GET',
    headers: headers
  })
};

export function requestRefreshToken() {
  return request<RequestRefreshTokenType>(BASE_URL + `/auth/token`, {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export function requestGetOrderWithRefresh(ingredients:string[]) {
  return createOrder(ingredients)
   .catch((error: string) => {
    if (error === 'jwt expired') {
      requestRefreshToken()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return createOrder(ingredients)
            .catch((err) => {
              return Promise.reject(err)
          })
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }
    return Promise.reject('Неизвестная ошибка')
  })
};

export function requestRegister(data: { email: string, password: string, name: string}) {
  return request<RequestUserType>(BASE_URL + `/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export function requestLogin(data: { email:string, password: string }) {
  return request<RequestUserType>(BASE_URL + `/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: data.email,
      password: data.password
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export function requestLogout() {
  return request<RequestRefreshUserInfoType>(BASE_URL + `/auth/logout`, {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export function requestGetUser() {
  return request<RequestGetUserType>(BASE_URL + `/auth/user`, {
    method: 'GET',
    headers: headers
  });
};

export function requestGetUserWithRefresh() {
  return requestGetUser()
    .catch((error: string) => {
      if (error === 'jwt expired') {
        requestRefreshToken()
          .then((res) => {
            localStorage.setItem("refreshToken", res.refreshToken);
            localStorage.setItem("accessToken", res.accessToken);
          })
        .then(() => {
          return requestGetUser()
            .catch((err) => {
              return Promise.reject(err)
            })
        })
        .catch((err) => {
          return Promise.reject(err)
        })
      }
      return Promise.reject('Неизвестная ошибка')
  })
};

export function requestChangeUser(data: ChangeUserType) {
  return request<RequestUserType>(BASE_URL + `/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    }),
    headers: headers
  });
};

export function requestChangeUserWithRefresh(data: {name: string, email: string, password: string}) {
  return requestChangeUser(data)
    .catch((error: string) => {
      if (error === 'jwt expired') {
        requestRefreshToken()
          .then((res) => {
            localStorage.setItem("refreshToken", res.refreshToken);
            localStorage.setItem("accessToken", res.accessToken);
          })
        .then(() => {
          return requestChangeUser(data)
            .catch((err) => {
              return Promise.reject(err)
            })
        })
        .catch((err) => {
          return Promise.reject(err)
        })
      }
      return Promise.reject('Неизвестная ошибка')
  })
};

export function requestForgotPassword(data: string) {
  return request<RequestRefreshUserInfoType>(BASE_URL + `/password-reset`, {
    method: 'POST',
    body: JSON.stringify({
      email: data
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export function requestResetPassword(data: { password: string, token: string }) {
  return request<RequestRefreshUserInfoType>(BASE_URL + `/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify({
      password: data.password,
      token: data.token
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};