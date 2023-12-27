import styles from './orders.module.css';
import { useEffect } from 'react';
import { 
    useAppDispatch,
    useAppSelector
} from '../../types/hooks';
import { 
    useLocation,
    Outlet
} from 'react-router-dom';
import Order from '../../components/order/order';
import { 
    PROFILE_ORDERS_WS_CONNECTION_START,
    PROFILE_ORDERS_WS_CONNECTION_STOP
} from '../../services/actions';

export default function Orders() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { orders } = useAppSelector(state => state.ordersData);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            dispatch({
                type: PROFILE_ORDERS_WS_CONNECTION_START,
                payload: `wss://norma.nomoreparties.space/orders?token=${accessToken.split('Bearer ')[1]}`
            });

            return () => {
                dispatch({ type: PROFILE_ORDERS_WS_CONNECTION_STOP });
            };
        }
    }, []);

    return (
        <>
            {location.pathname === '/profile/orders' &&
                <ul className={`${styles.orders} custom-scroll`}>
                    {orders.length > 0 && 
                    orders.map(order => <Order key={order._id} order={order} />)}
                </ul>
            }
            <Outlet />
        </>
    )
};