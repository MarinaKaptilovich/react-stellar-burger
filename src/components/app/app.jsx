import AppHeader from "../app-header/app-header";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useActions } from "../../utils/use-actions";
import { getIngredients } from "../../utils/api";

import { 
  useLocation,
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
import NotFound from "../../pages/not-found/not-found";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { checkUserAuth } from "../../services/user";
import { 
  OnlyAuth,
  OnlyUnAuth
} from "../protected-route/protected-route-element";

export default function App() {
  const { setIngredients, setError } = useActions();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    getIngredients()
      .then(ingredient => setIngredients([...ingredient.data]))
      .catch(error => setError({ hasError: true, errorMessage: error }))
  }, []);

  useEffect(() => dispatch(checkUserAuth()), []);

  return (
    <>
      <AppHeader />
        <Routes location={background || location}>
        <Route path="/" element={ <Home /> } />
        <Route path='/ingredients/:ingredientId' element={ <IngredientDetails fullScrin={true} /> } />
        <Route path="/login" element={<OnlyUnAuth component = { <Login /> } />} />
        <Route path="/register" element={ <OnlyUnAuth component = { <Register /> } />} />
        <Route path="/forgot-password" element={ <OnlyUnAuth component = { <ForgotPassword /> } /> } />
        <Route path="/reset-password" element={ <OnlyUnAuth component = { <ResetPassword /> } /> } />
        <Route path="/profile" element={ <OnlyAuth component={ <Profile /> } /> } >
          <Route index element={ <ProfileSetting /> } />
          <Route path="orders" element={ <Orders /> } />
        </Route>
        <Route path="/feed" element={ <Feed /> } />
        <Route path="*" element={ <NotFound /> } /> 
      </Routes>
    </>
  );
}
