import {useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";

function BurgerIngredients({ ingredients, onModalOpen }) {
    const categories = [
        {bun: 'Булки'},
        {sauce: 'Соусы'},
        {main: 'Начинки'}
    ];
  
    const [currentTab, setCurrentTab] = useState(Object.keys(categories[0])[0]);
  
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
                    {ingredients.filter(ingredient => ingredient.type === categoryName).map(ingredient => (
                        <Ingredient key={ingredient._id} ingredient={ingredient} amount={1} onModalOpen={onModalOpen} />
                    ))}
                    </div>
                </div>
                )
            })}
            </div>
      </section>
    )
}

BurgerIngredients.propTypes = {
    ingridients: PropTypes.arrayOf(ingredientPropType).isRequired,
    onModalOpen: PropTypes.func.isRequired
}

export default BurgerIngredients;