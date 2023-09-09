import { ingredientPropType } from "../../utils/prop-types";
import styles from "./ingredient-details.module.css"

function IngredientDetails({ ingredient }) {
    return (
        <div className={styles.ingredient}>
          <img src={ingredient.image_large} alt={ingredient.name} className="pb-4 pl-5 pr-5" />
          <h3 className="pb-8 pt-4 text text_type_main-medium">{ingredient.name}</h3>
          <ul className={`pb-15 text ${styles.stats}`}>
            <li className={`text_color_inactive ${styles.stat}`}>
              <p className="text text_type_main-default">Калории, ккал</p>
              <p className="text text_type_digits-default">{ingredient.calories}</p>
            </li>
            <li className={`text_color_inactive ${styles.stat}`}>
              <p className="text text_type_main-default">Белки, г</p>
              <p className="text text_type_digits-default">{ingredient.proteins}</p>
            </li>
            <li className={`text_color_inactive ${styles.stat}`}>
              <p className="text text_type_main-default">Жиры, г</p>
              <p className="text text_type_digits-default">{ingredient.fat}</p>
            </li>
            <li className={`text_color_inactive ${styles.stat}`}>
              <p className="text text_type_main-default">Углеводы, г</p>
              <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </div>
    )
}
  
  IngredientDetails.propTypes = {
    ingredient: ingredientPropType
  }
  
  export default IngredientDetails;