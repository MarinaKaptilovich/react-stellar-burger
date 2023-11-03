import styles from './order.module.css';
import { 
    FormattedDate,
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { 
    Link,
    useLocation
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function getIngredientsId(array) {
    return array.reduce((total,item) => {
        if (item) {
          return [...total, item._id]
        }
        else {
          return total
        }
    }, [])
};

export default function Order({ order }) {
    const location = useLocation();
    const { ingredients } = useSelector(state => state.ingredientsData);
    const currentIngredients = order.ingredients.map(item => getIngredientsId(ingredients, item));
    
    const orderPrice = currentIngredients.reduce((sum, item) => {
        return sum + item.price
    }, 0);
        
    const date = () => {
        const dateFromServer = order.createdAt
        return <FormattedDate 
            date={new Date(dateFromServer)} 
            className='text text_type_main-default text_color_inactive'
        />
    };

    let url 
        if(location.pathname === '/feed') {
            url = `/feed/${order.number}`
        }
        if(location.pathname === 'profile/orders') {
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
                    { location.pathname === 'feed' && 
                        <p className={`${styles.order_title} text text_type_main-medium`}>
                            {order.name}
                        </p>
                    }
                    { location.pathname === 'profile/orders' && 
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
                        <ul className={styles.ingrediences}>
                            {currentIngredients.map((item, index) => (
                            <li className={styles.ingredient} key={index} style={{ zIndex: 6 - index, backgroundImage: `url(${item.image_mobile})` }}></li>
                            ))}
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