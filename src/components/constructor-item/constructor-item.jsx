import { useRef } from "react";
import { 
    useDrag,
    useDrop
} from "react-dnd";
import { useSelector } from "react-redux";
import { 
    ConstructorElement, 
    DragIcon 
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useActions } from "../../utils/use-actions";
import styles from './constructor-item.module.css';
import { ingredientPropType } from '../../utils/prop-types';

export default function ConstructorItem({ ingredientData }) {
    const fillings = useSelector(state => state.burgerData.fillings);
    const { sortFilling, deleteFilling } = useActions();
    const dropIndex = fillings.findIndex(item => item.key === ingredientData.key);

    const [, drag, preview] = useDrag(() => ({
        type: 'burgerIngredient',
        item: ingredientData
    }));

    const [,drop] = useDrop(() => ({
        accept: 'burgerIngredient',
        hover: (item) => {
            const dragIndex = fillings.findIndex(filling => filling.key === item.key)
            sortFilling({ dragIndex: dragIndex, dropIndex: dropIndex })
        },
        drop: (item) => {
            const dragIndex = fillings.findIndex(filling => filling.key === item.key)
            sortFilling({ dragIndex: dragIndex, dropIndex: dropIndex })
        }
    }));

    return (
        <div ref={preview}>
            <li className={styles.item} ref={drop}>
                <div ref={drag}>
                <DragIcon type="primary"/>
                </div>
                <ConstructorElement 
                    price={ingredientData.price}
                    thumbnail={ingredientData.image}
                    text={ingredientData.name}
                    handleClose={() => {
                        deleteFilling(ingredientData)
                }}
            />
            </li>
        </div>
    )
};

ConstructorItem.propTypes = {
    ingredientData: ingredientPropType.isRequired
}