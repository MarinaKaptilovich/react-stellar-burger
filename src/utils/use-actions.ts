import { useAppDispatch } from "../types/hooks";
import { bindActionCreators } from "redux";
import { burgerActions } from "../services/burger-constructor";

const actions = {
    ...burgerActions,
};

export function useActions() {
    const dispatch = useAppDispatch()

    return bindActionCreators(actions, dispatch)
};