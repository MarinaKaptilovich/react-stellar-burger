import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { burgerActions } from "../services/burger-constructor";
import { ingredientsAction } from "../services/ingredients";
import { modalActions } from "../services/modal";

const actions = {
    ...burgerActions,
    ...ingredientsAction,
    ...modalActions,
};

export function useActions() {
    const dispatch = useDispatch()

    return bindActionCreators(actions, dispatch)
};