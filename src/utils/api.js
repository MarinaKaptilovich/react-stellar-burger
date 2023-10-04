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
      'Content-Type': 'application/json'
    }
  });
};