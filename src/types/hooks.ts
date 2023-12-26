import { store } from "../services/store";
import { RootState } from "./state";
import { 
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from "react-redux";

export type AppDispatch = typeof store.dispatch;

export type ThunkApiConfig = {
    state?: RootState,
    dispatch?: AppDispatch,
    rejectValue?: Error
};

type DispatchFunc = () => AppDispatch;
export const usingDispatch: DispatchFunc = useDispatch;
export const usingSelector: TypedUseSelectorHook<RootState> = useSelector;

export type useFormProps = {
    name?: string,
    email?: string,
    password?: string
};