import { requestRefreshToken } from "../utils/api";
import { 
  WebSocketOrder,
  WsConfigType
} from "../types/middleware";
import { RootState } from "../types/state";
import { Middleware } from "redux";

function checkOrdersIngredients(array: WebSocketOrder[]) {
    return array.filter(item => item.ingredients.every(element => element));
};

export const socketMiddleware = (wsConfig: WsConfigType) : Middleware<{}, RootState> => store => {
    let socket: WebSocket | null = null;
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
                    reconnectTimer = window.setTimeout(() =>
                    dispatch({ type: onStart }), 3000);
                }
                dispatch(onClose(event.wasClean ? 
                'Closed correct' : 'Closed uncorrect'));
            }
      
            socket.onerror = event => {
              dispatch(onError('Ошибка'))
            }
          
            socket.onmessage = event => {
              let data = JSON.parse(event.data)
              if(data.message === 'Invalid or missing token') {
                requestRefreshToken()
                      .then((res) => {
                        localStorage.setItem("refreshToken", res.refreshToken);
                        localStorage.setItem("accessToken", res.accessToken);
                      })
                      .then(() => {
                        let token = localStorage.getItem('accessToken')
                        dispatch({
                          type: 'onStart',
                          payload: {
                            url: 'wss://norma.nomoreparties.space/orders',
                            token: token ? token.split('Bearer ')[1] : '' 
                          }
                        });
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