import styles from './order.module.css';
import { 
    FormattedDate,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { 
    Link,
    useLocation
} from 'react-router-dom';
import { usingSelector } from '../../types/hooks';
import { OrderProps } from '../../types/order';
import { findIngredientById } from '../../utils/utils';

export default function Order({ order } : OrderProps) {
    const location = useLocation();
    const { ingredients } = usingSelector(state => state.ingredientsData);
    const currentIngredients = ingredients != null && order.ingredients.map(item => findIngredientById(ingredients, item))
    const orderPrice = currentIngredients && currentIngredients.reduce((sum, item) => {
        return sum + item.price
    }, 0);
        
    const date = () => {
        const dateFromServer = order.createdAt
        return <FormattedDate date={new Date(dateFromServer)} className='text text_type_main-default text_color_inactive'/>
    };

    let url: string = ''
        if(location.pathname === '/feed') {
            url = `/feed/${order.number}`
        }
        else if(location.pathname === '/profile/orders') {
            url = `/profile/orders/${order.number}`
        }
    
    return (
        <Link to={url} state={{ background: location }}>
            <ul className={styles.feed}>
                <li className={styles.order}>
                    <div className={styles.details}>
                        <p className='text text_type_digits-default'>
                            {`#${order.number}`}
                        </p>
                            { date() }
                    </div>
                    { location.pathname === '/feed' && 
                        <p className={`${styles.order_title} text text_type_main-medium`}>
                            {order.name}
                        </p>
                    }
                    { location.pathname === '/profile/orders' && 
                        <div className={styles.status}>
                            <p className={`${styles.order_title} text text_type_main-medium`}>
                                {order.name}
                            </p>
                            <p className='text text_type_main-default'>
                                {order.status === 'done' ? 'Создан' : 'Готовится'}
                            </p>
                        </div>
                    }
                    <div className={styles.order_summary}>
                        <ul className={styles.ingredients}>
                            {currentIngredients && currentIngredients.map((item, index) => {
                                if (index <= 4) {
                                    return <li className={styles.ingredient} key={index} style={{ backgroundImage: `url(${item.image_mobile})` }} />
                                }
                                return null
                            })}
                            {currentIngredients && currentIngredients.length > 5 &&
                                <li className={styles.ingredient_counter} style={{zIndex: 1, backgroundImage: `url(${currentIngredients[5].image_mobile})`}}>
                                    <p className={`${styles.ingredient_counter} text text_type_main-default`}>
                                        {`+${currentIngredients.length - 5}`}
                                    </p>
                                </li>
                            }
                        </ul>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default">{orderPrice}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </li>
            </ul>
        </Link>
    )
};