import { 
  useState,
  useRef
} from 'react';
import React from 'react';
import { usingSelector } from '../../types/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';

export default function BurgerIngredients() {
  const ingredients = usingSelector(state => state.ingredientsData.ingredients);

  const buns = ingredients != null && ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients != null && ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients != null && ingredients.filter((item) => item.type === 'sauce');

  const [currentTab, setCurrentTab] = useState('bun');

  const ingredientsContainer = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLParagraphElement>(null);
  const sauceRef = useRef<HTMLParagraphElement>(null);

  const handleScroll = () => {
    const containerScroll = ingredientsContainer.current != null ? ingredientsContainer.current.getBoundingClientRect().top : 0
    const bunScroll = bunRef.current != null ? bunRef.current.getBoundingClientRect().top - containerScroll : 0
    const sauceScroll = sauceRef.current != null ? sauceRef.current.getBoundingClientRect().top - containerScroll : 0
    const mainScroll = mainRef.current != null ? mainRef.current.getBoundingClientRect().top - containerScroll : 0
    const maxOffset = -30
    if (bunScroll <= 0 && bunScroll > maxOffset) {
      setCurrentTab('bun')
    }
    else if (sauceScroll <= 0 && sauceScroll > maxOffset) {
      setCurrentTab('sauce')
    }
    else if (mainScroll <= 0 && mainScroll > maxOffset) {
      setCurrentTab('main')
    }
  };

  return (
    <section className={`pt-10 main-block ${styles.section}`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={styles.categories}>
        <Tab 
          value="bun" 
          active={currentTab === 'bun'} 
          onClick={() => {
            setCurrentTab('bun');
            bunRef.current != null && bunRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }}>
            Булки
        </Tab>
        <Tab 
          value="sauce" 
          active={currentTab === 'sauce'} 
          onClick={() => {
            setCurrentTab('bun');
            sauceRef.current != null && sauceRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }}>
            Соусы
        </Tab>
        <Tab 
          value="main" 
          active={currentTab === 'main'} 
          onClick={() => {
            setCurrentTab('bun');
            mainRef.current != null && mainRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }}>
            Начинки
        </Tab>
      </div>

      <div 
        className={`custom-scroll pt-10 ${styles.ingredientsPanel}`} 
        onScroll={handleScroll} 
        ref={ingredientsContainer}>
          <div>
            <p className="text text_type_main-medium mb-6" ref={bunRef}>
              Булки
            </p>
            <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
              {buns && buns.map((ingredient)=> (
                <Ingredient
                  key={ingredient._id}
                  ingredientData={ingredient}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium mt-10 mb-6" ref={sauceRef}>
              Соусы
            </p>
            <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
              {sauces && sauces.map((ingredient) => (
                <Ingredient
                  key={ingredient._id}
                  ingredientData={ingredient}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>
              Начинки
            </p>
            <div className={`pt-6 pb-10 pl-4 pr-1 ${styles.ingredients}`}>
              {mains && mains.map((ingredient)=> (
                <Ingredient
                  key={ingredient._id}
                  ingredientData={ingredient}
                />
              ))}
            </div>
          </div>
      </div>

    </section>
  )
}
