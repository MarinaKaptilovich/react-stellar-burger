import AppHeader from "../app-header/app-header";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  useLocation,
  useNavigate,
  Route,
  Routes
} from "react-router-dom";

import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileSetting from "../../pages/profile/_setting/profile-setting";
import Feed from "../../pages/feed/feed";
import Orders from "../../pages/orders/orders";
import OrderId from "../order/_id/order_id";
import NotFound from "../../pages/not-found/not-found";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Loader from "../loader/loader";

import { checkUserAuth } from "../../services/user";
import { 
  OnlyAuth,
  OnlyUnAuth
} from "../protected-route/protected-route-element";

import { useActions } from '../../utils/use-actions';
import { getIngredients } from '../../utils/api';

export default function App() {
  const { setIngredients, setError } = useActions();

  useEffect(() => {
      getIngredients()
          .then(ingredient => setIngredients([...ingredient.data]))
          .catch(error => setError({ hasError: true, errorMessage: error }))
  }, []);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const background = location.state && location.state.background;

  const toggleHandler = () => {
    navigate('/')
  };

  useEffect(() => dispatch(checkUserAuth()), []);

  const userLoaderActive = useSelector(store => store.userData.loaderActive);
  const orderLoaderActive = useSelector(store => store.orderData.loaderActive);

  if(location.pathname !== '/feed') {
    dispatch({type: 'FEED_WS_CONNECTION_STOP'})
  }

  if(location.pathname !== '/profile/orders') {
    dispatch({type: 'PROFILE_ORDERS_WS_CONNECTION_STOP'})
  }

  return (
    <>
      <AppHeader />
      { userLoaderActive
      ? <Loader />
      : 
        <Routes location={background || location}>
          <Route path="/" element={ <Home /> } />
          <Route path='/ingredients/:id' element={ <IngredientDetails /> } />
          <Route path="/login" element={<OnlyUnAuth component = { <Login /> } />} />
          <Route path="/register" element={ <OnlyUnAuth component = { <Register /> } />} />
          <Route path="/forgot-password" element={ <OnlyUnAuth component = { <ForgotPassword /> } /> } />
          <Route path="/reset-password" element={ <OnlyUnAuth component = { <ResetPassword /> } /> } />
          <Route path="/profile" element={ <OnlyAuth component={ <Profile /> } /> } >
            <Route index element={ <ProfileSetting /> } />
            <Route path="orders" element={ <Orders /> }>
              <Route path=":number" element={ <OrderId /> } />
            </Route>
          </Route>
          <Route path="/feed" element={ <Feed /> }>
            <Route path=":number" element={ <OrderId /> } />
          </Route>
          <Route path="*" element={ <NotFound /> } /> 
        </Routes>
      }

      { background &&
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal title='Детали ингредиента' toggle={toggleHandler}>
            <IngredientDetails />
          </Modal>
          }
          />

          <Route path="/order" element={
            <OnlyAuth component={
              <Modal toggle={toggleHandler}>
                { orderLoaderActive 
                ? <Loader />
                : <OrderDetails />
                }
              </Modal>
            }
            />
          }
          />
        </Routes>
      }
    </>
  );
}
