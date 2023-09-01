import React from 'react';
import { 
    Tab,
    Counter,
    CurrencyIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingridients.module.css';
import { ingredientPropType } from '../../utils/prop-types';

function Ingredient({ name, amount, price, image }) {
    return (
        <div className={styles.card}>
            {amount && <Counter count={amount} />}
            <img src={image} alt={name} className="pl-4 pr-4" />
            <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon /></p>
            <p className={`text text_type_main-default ${styles.name}`} >{name}</p>
        </div>
    )
}
  
Ingredient.propTypes = {
    data: ingredientPropType
}; 

function BurgerIngredients({ data }) {
    const categories = [
        {bun: 'Булки'},
        {sauce: 'Соусы'},
        {main: 'Начинки'}
    ];
  
    const [currentTab, setCurrentTab] = React.useState(Object.keys(categories[0])[0]);
  
    return (
        <section className={`pt-10 main-block ${styles.section}`}>
            <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
            <div className={styles.categories}>
            {categories.map(item => {
                const id = Object.keys(item)[0]
                const name = item[id]
                return <Tab value={id} key={id} active={currentTab === id} onClick={setCurrentTab}>{name}</Tab>
            })}
            </div>
            <div className={`custom-scroll pt-10 ${styles.ingredientsPanel}`}>
            {categories.map(category => {
                const categoryName = Object.keys(category)[0] 
                return (
                <div key={categoryName}>
                    <h2 className="text text_type_main-large">{category[categoryName]}</h2>
                    <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
                    {data.filter(ingredient => ingredient.type === categoryName).map(ingredient => (
                        <Ingredient key={ingredient._id} image={ingredient.image} price={ingredient.price} name ={ingredient.name} amount={1} />
                    ))}
                    </div>
                </div>
                )
            })}
            </div>
      </section>
    )
}

export default BurgerIngredients