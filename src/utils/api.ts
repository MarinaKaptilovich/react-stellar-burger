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

function checkResult(res:Response) {
  return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};

function request<T>(url: string, params: RequestInit) : Promise<T> {
  return fetch(url, params)
    .then(res => checkResult(res))
};

const getHeaders = () => {
  const headers = new Headers();

  const accessToken = localStorage.getItem('accessToken')

  headers.append('Content-Type', 'application/json');

  if (accessToken) {
    headers.append('authorization', accessToken);
  }

  return headers
}

export async function getIngredients() : Promise<IngredientType[]> {
  const res = await fetch(BASE_URL + `/ingredients`)
  const result = await checkResult(res)
  return result.data
};

export function createOrder(ingredients:string[]) {
  return request<OrderType>(BASE_URL + `/orders`, {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: getHeaders()
  });
};

export function getOrder(number: string) {
  return request<RequestGetOrderType>(BASE_URL + `/orders/${number}`, { 
    method: 'GET',
    headers: getHeaders()
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
    headers: getHeaders()
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
    headers: getHeaders()
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