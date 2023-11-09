import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useActions } from "../../utils/use-actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function Ingredient() {
    const { setModalIngredient } = useActions();
    const { id } = useParams();
    const ingredients = useSelector(state => state.ingredientsData.ingredients);

    console.log(ingredients);

    useEffect(() => {
        const data = ingredients?.find(data => data._id === id) || {}
        setModalIngredient(data)
    }, [ingredients]);

    return (
        <div className="pt-30" style={{textAlign: 'center'}}>
            <h1 className="text text_type_main-large text_color_primary">
                Детали ингредиента
            </h1>
            <IngredientDetails />
        </div>
    )
};