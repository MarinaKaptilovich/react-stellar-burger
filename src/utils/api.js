const config = {
    url: 'https://norma.nomoreparties.space/api/ingredients',
  }
  
  async function requestApi(url, requestMethod) {
    return fetch(`${url}`, {
      method: requestMethod,
    })
    .then(res => checkResult(res))
  }
  
  function checkResult(res) {
    return res.ok ? res.json() : Promise.reject('Error: ', res.status);
  }
  
  export function getIngredients(){
    return requestApi(config.url, 'GET');
  }