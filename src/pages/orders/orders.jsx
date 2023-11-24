import styles from './orders.module.css';
import { useEffect } from 'react';
import { 
    useDispatch,
    useSelector
} from 'react-redux';
import { 
    useLocation,
    Outlet
} from 'react-router-dom';
import Order from '../../components/order/order';

export default function Orders() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { orders } = useSelector(state => state.ordersData);

    useEffect(() => {
        dispatch({
            type: 'PROFILE_ORDERS_WS_CONNECTION_START', 
            payload: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken').split('Bearer ')[1]}`
        })
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