export const socketMiddleware = wsConfig => {
    return (store) => {
        let socket = null
        const { onOpen } = wsConfig
        return (next) => {
            return (action) => {
                const { type, payload } = action
                const { dispatch } = store
                
                if (type === 'wsInit') {
                    socket = new WebSocket(payload)
                }

                socket.onOpen = (e) => {
                    console.log(e)
                }

                next(action)
            }
        }
    }
};