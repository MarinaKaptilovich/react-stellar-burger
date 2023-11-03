const api = 'https://norma.nomoreparties.space/api';

const request = async (url, params) => {
  const response = await fetch(`${api}${url}`, params);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData);
  }
  return response.json();
};

export const getIngredients = () => request('/ingredients');

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

export const requestGetOrderWithRefresh = async (ingredients) => {
  try {
    return await createOrder(ingredients);
  } catch (error) {
    if (error === 'jwt expired') {
      requestRefreshToken()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return createOrder(ingredients)
            .catch((error) => {
              return Promise.reject(error);
            });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
  }
};

export const requestRegister = (data) => {
  return request('/auth/register', {
    method: 'POST',
    body:JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name
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
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export const requestGetUserWithRefresh = async () => {
  try {
    return await requestGetUser();
  } catch (error) {
    if (error === 'jwt expired') {
      requestRefreshToken()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return requestGetUser()
            .catch((error) => {
              return Promise.reject(error);
            });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
  }
};

export const requestChangeUser = (data) => {
  return request('auth/user', {
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    }),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export const requestChangeUserWithRefresh = async (data) => {
  try {
    return await requestChangeUser(data);
  } catch (error) {
    if (error === 'jwt expired') {
      requestRefreshToken()
        .then((res) => {
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("accessToken", res.accessToken);
        })
        .then(() => {
          return requestChangeUser(data)
            .catch((error) => {
              return Promise.reject(error);
            });
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
  }
};

export const requestForgotPassword = (data) => {
  return request('password-reset', {
    method: 'POST',
    body: JSON.stringify({
      email: data
    }),
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const requestResetPassword = (data) => {
  return request('password-reset/reset', {
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
