import { requestRefreshToken } from "../utils/api";

function checkOrdersIngredients(array) {
    return array.filter(item => item.ingredients.every(element => element));
};

export const socketMiddleware = wsConfig => store => {
    let socket = null;
    let isConnected = false;
    let reconnectTimer = 0;
    const { onStart, onStop, onOpen, onMessage, onClose, onError } = wsConfig;

    return next => action => {
        const { type, payload } = action
        const { dispatch } = store
        
        if (type === onStart) {
            socket = new WebSocket(payload)
            isConnected = true
        }

        if(socket) {
            if (type === onStop) {
              clearTimeout(reconnectTimer)
              isConnected = false
              reconnectTimer = 0
              socket.close(1000, 'Пользователь покинул страницу')
            }
      
            socket.onopen = event => {
              dispatch(onOpen(event.type))
            }
      
            socket.onclose = event => {
                if (isConnected) {
                    reconnectTimer = setTimeout(() =>
                    dispatch({ type: onStart }), 3000);
                }
                dispatch(onClose(event.wasClean ? 
                'Closed correct' : 'Closed uncorrect'));
            }
      
            socket.onerror = event => {
              dispatch(onError(event.message))
            }
          
            socket.onmessage = event => {
              let data = JSON.parse(event.data)
              if(data.message === 'Invalid or missing token') {
                requestRefreshToken()
                      .then((res) => {
                        localStorage.setItem("refreshToken", res.refreshToken);
                        localStorage.setItem("accessToken", res.accessToken);
                      })
                      .then((res) => {
                        dispatch({
                        type: 'PROFILE_ORDERS_WS_CONNECTION_START', 
                        payload: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken').split('Bearer ')[1]}`})
                      })
                      .catch((err) => {
                        return Promise.reject(err)
                      })
              }
              let chekedData = {
                ...data,
                orders: checkOrdersIngredients(data.orders)
              }
              dispatch(onMessage(chekedData))
            }
          }
      
          return next(action)
    }
}