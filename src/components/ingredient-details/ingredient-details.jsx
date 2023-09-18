import { ingredientPropType } from "../../utils/prop-types";
import styles from "./ingredient-details.module.css"

function IngredientDetails({ ingredient }) {
  return (
    <>
      <h1 className={`${styles.title} text text_type_main-large mt-8`}>
        Детали ингредиента
      </h1>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h1 className="text text_type_main-medium mt-4">{ingredient.name}</h1>
      <div className={`${styles.ingredients} mt-8 mb-15`}>
        <article className={styles.value}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</span>
        </article>
        <article className={styles.value}>
        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
        <span className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</span>
        </article>
        <article className={styles.value}>
        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
        <span className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</span>
        </article>
        <article className={styles.value}>
        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
        <span className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</span>
        </article>
      </div>
    </>
  );
}
  
  IngredientDetails.propTypes = {
    ingredient: ingredientPropType
  }
  
  export default IngredientDetails;