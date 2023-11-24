const API = 'https://norma.nomoreparties.space/api';

const checkResult = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

const request = async (url, params) => {
  const res = await fetch(`${API}${url}`, params);
  return checkResult(res);
};

export const getIngredients = async () => {
  try {
    const res = await fetch(API + '/ingredients')
    const result = await checkResult(res)
    return({
      result: result.data,
      success: true
    })
  } catch (err) {
    throw new Error(err)
  }
};

export const createOrder = (ingredients) => {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export const getOrder = (number) => {
  return request(`/orders/${number}`, { 
    method: 'GET'
  })
};

export const requestRefreshToken = () => {
  return request('/auth/token', {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export async function requestGetOrderWithRefresh(ingredients) {
  try {
    return await createOrder(ingredients);
  } catch (error) {
    if (error.message === 'jwt expired') {
      requestRefreshToken()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        });
      return createOrder();
    }
  }
};

export const requestRegister = ({ email, password, name }) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      name
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const requestLogin = (data) => {
  return request('/auth/login', {
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

export const requestLogout = () => {
  return request('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const requestGetUser = () => {
  return request('/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export const requestGetUserWithRefresh = async () => {
  try {
    return await requestGetUser();
  } catch (error) {
    if (error.message === 'jwt expired') {
      requestRefreshToken()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
      return requestGetUser();
    }
  }
};

export const requestChangeUser = ({ name, email, password }) => {
  return request('/auth/user', {
    method: 'PATCH',
    body: JSON.stringify({
      name,
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export const requestChangeUserWithRefresh = async (data) => {
  try {
    return await requestChangeUser(data);
  } catch (error) {
    if (error.message === 'jwt expired') {
      requestRefreshToken()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
      return requestChangeUser(data);
    }
  }
};

export const requestForgotPassword = (data) => {
  return request('/password-reset', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const requestResetPassword = ({ password, token }) => {
  return request('/password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      password,
      token
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};
