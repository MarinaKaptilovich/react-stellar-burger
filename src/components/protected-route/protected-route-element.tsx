import { useAppSelector } from "../../types/hooks";
import { 
    Navigate,
    useLocation
} from "react-router-dom";
import { ProtectedRouteProps } from "../../types/protected";

const ProtectedElement = ({ component, onlyUnAuth = false } : ProtectedRouteProps) => {
    const user = useAppSelector(store => store.userData.user);
    const location = useLocation();

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
    }
    if (!onlyUnAuth && !user) {
        const from = (location.pathname === '/order') ? '/' : location.pathname;
        return <Navigate to='/login' state={{from: from}} />;
    }

    return component;
};

export const OnlyAuth = ProtectedElement;
export const OnlyUnAuth = ({ component } : { component: JSX.Element }) => (
    <ProtectedElement component={component} onlyUnAuth={true} />
);