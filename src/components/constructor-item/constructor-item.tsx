import { 
    useDrag,
    useDrop
} from "react-dnd";
import { useAppSelector } from "../../types/hooks";
import { 
    ConstructorElement, 
    DragIcon 
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useActions } from "../../utils/use-actions";
import styles from './constructor-item.module.css';
import { IngredientType, IngredientProps } from "../../types/ingredients";

export default function ConstructorItem({ ingredientData } : IngredientProps) {
    const fillings = useAppSelector(state => state.burgerData.fillings);
    const { sortFilling, deleteFilling } = useActions();
    const dropIndex = fillings.findIndex(item => item.key === ingredientData.key);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'burgerIngredient',
        item: ingredientData,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: 'burgerIngredient',
        hover: (item: IngredientType) => {
            const dragIndex = fillings.findIndex(filling => filling.key === item.key)
            sortFilling({ dragIndex: dragIndex, dropIndex: dropIndex })
        },
        drop: (item) => {
            const dragIndex = fillings.findIndex(filling => filling.key === item.key)
            sortFilling({ dragIndex: dragIndex, dropIndex: dropIndex })
        }
    }), [fillings]);

    const opacity = isDragging ? 0 : 1

    return (
        <div ref={preview}>
            <li className={styles.item} style={{ opacity }} ref={drop}>
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
