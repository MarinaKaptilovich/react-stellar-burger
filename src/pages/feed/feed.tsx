import styles from './feed.module.css';
import { useEffect } from 'react';
import { 
    useLocation,
    Outlet
} from 'react-router-dom';
import { 
    usingDispatch,
    usingSelector
} from '../../types/hooks';
import Order from '../../components/order/order';
import { FEED_WS_CONNECTION_START } from '../../services/actions';

export default function Feed() {
    const dispatch = usingDispatch();
    const location = useLocation();
    const { orders, total, totalToday } = usingSelector(state => state.feedData);

    useEffect(() => {
        dispatch({
            type: FEED_WS_CONNECTION_START,
            payload: 'wss://norma.nomoreparties.space/orders/all'
        });
    }, []);

    return (
        <main className={styles.main}>
            {location.pathname === '/feed' &&
                <section className={styles.section}>
                    <p className='text text_type_main-large'>
                        Лента заказов
                    </p>
                    <div className={styles.container}>
                        <div className={`${styles.feed_container} custom-scroll`}>
                            {orders.length > 0 && orders.map(order => <Order key={order._id} order={order}/>)}
                        </div>
                        <div className={styles.orders_container}>
                            <div className={styles.orders}>
                                <div className={styles.orders_ready}>
                                    <p className={`${styles.orders_ready_title} text text_type_main-medium`}>
                                        Готовы:
                                    </p>
                                    <div className={styles.orders_ready_numbers}>
                                        {orders.map(order => {
                                            if(order.status === 'done') {
                                                return <p className="text text_type_digits-default text_color_inactive" key={order._id}>
                                                    {order.number}
                                                </p>
                                            }
                                        })}
                                    </div>
                                </div>
                                    <div className={styles.orders_todo}>
                                        <p className={`${styles.orders_todo_title} text text_type_main-medium`}>
                                            В работе:
                                        </p>
                                    <div className={styles.orders_todo_numbers}>
                                        {orders.map(order => {
                                            if(order.status !== 'done') {
                                                return <p className="text text_type_digits-default" key={order._id}>
                                                    {order.number}
                                                </p>
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.done_alltime}>
                                <p className='text text_type_main-medium'>
                                    Выполнено за все время:
                                </p>
                                <p className={`${styles.digits_shadow} text text_type_digits-large`}>
                                    {total}
                                </p>
                            </div>
                            <div className={styles.done_today}>
                            <p className='text text_type_main-medium'>
                                Выполнено за сегодня:
                            </p>
                            <p className={`${styles.digits_shadow} text text_type_digits-large`}>
                                {totalToday}
                            </p>
                            </div>
                        </div>
                    </div>
                </section>
            }
            <Outlet />
        </main>
    )
};