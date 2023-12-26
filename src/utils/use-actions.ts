import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { burgerActions } from "../services/burger-constructor";

const actions = {
    ...burgerActions,
};

export function useActions() {
    const dispatch = useDispatch()

    return bindActionCreators(actions, dispatch)
};