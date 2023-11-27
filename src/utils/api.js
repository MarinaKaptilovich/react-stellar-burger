const api = {
  ingredientsUrl: 'https://norma.nomoreparties.space/api/ingredients',
  orderUrl: 'https://norma.nomoreparties.space/api/orders'
};

function checkResult(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.message}`);
  }
  return res.json();
};

function request(url, params) {
  return fetch(url, params)
    .then(res => checkResult(res))
};

export async function getIngredients() {
  try {
    const res = await fetch(api.ingredientsUrl)
    const result = await checkResult(res)
    return({
      result: result.data,
      success: true
    })
  } catch (err) {
    return new Error(err)
  }
};

export function createOrder(ingredients) {
  return request(api.orderUrl, {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export function getOrder(number) {
  return request(`${api.orderUrl}/${number}`, { 
    method: 'GET'
  })
};

export function requestRefreshToken() {
  return request('https://norma.nomoreparties.space/api/auth/token', {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export function requestGetOrderWithRefresh(ingredients) {
  return createOrder(ingredients)
   .catch((error) => {
    if (error.message === 'jwt expired') {
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
  })
};

export function requestRegister(data) {
  return request('https://norma.nomoreparties.space/api/auth/register', {
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

export function requestLogin(data) {
  return request('https://norma.nomoreparties.space/api/auth/login', {
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
  return request('https://norma.nomoreparties.space/api/auth/logout', {
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
  return request('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export function requestGetUserWithRefresh() {
  return requestGetUser()
    .catch((error) => {
      if (error.message === 'jwt expired') {
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
  })
};

export function requestChangeUser(data) {
  return request('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      email: data.login,
      password: data.password
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export function requestChangeUserWithRefresh(data) {
  return requestChangeUser(data)
    .catch((error) => {
      if (error.message === 'jwt expired') {
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
  })
};

export function requestForgotPassword(data) {
  return request('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    body: JSON.stringify({
      email: data
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export function requestResetPassword(data) {
  return request('https://norma.nomoreparties.space/api/password-reset/reset', {
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