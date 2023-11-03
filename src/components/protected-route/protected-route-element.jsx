import { useSelector } from "react-redux";
import { 
    Navigate,
    useLocation
} from "react-router-dom";

const ProtectedElement = ({ component, onlyUnAuth = false }) => {
    const user = useSelector(store => store.userData.user);
    const location = useLocation();

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to='/login' state ={{ from: from }} />;
    }

    return component;
};

export const OnlyAuth = ProtectedElement;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedElement onlyUnAuth={true} component={component} />
);