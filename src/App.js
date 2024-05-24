import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import HomeScreen from "./screens/home/HomeScreen";
import QuestionaryScreen from "./screens/questionary/QuestionaryScreen";
import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/signup/SignupScreen";
import PrivateRoute from "./components/routing/PrivateRoute";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import ProjectDetailScreen from "./screens/project/ProjectDetailScreen";
import AdminRoute from "./components/routing/AdminRoute";
import AddCategoryScreen from "./screens/add-category/AddCategoryScreen";
import AddProjectScreen from "./screens/add-project/AddProjectScreen";
import AdminCategoriesScreen from "./screens/admin-categories/AdminCategoriesScreen";
import AdminProjectsScreen from "./screens/admin-project/AdminProjectsScreen";
import AdminDashboardScreen from "./screens/admin-dashboard/AdminDashboardScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import EditProfileScreen from "./screens/profile/EditProfileScreen";
import PaymentScreen from "./screens/payment/PaymentScreen";

import store from "./store";

import './App.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Elements stripe={stripePromise}>
            <Routes>
                <Route path={'/'} element={<HomeScreen/>}/>
                <Route path={'/quiz'} element={<QuestionaryScreen/>}/>
                <Route path={'/login'} element={<LoginScreen/>}/>
                <Route path={'/signup'} element={<SignupScreen/>}/>
                <Route path={''} element={<PrivateRoute/>}>
                    <Route path={'/dashboard'} element={<DashboardScreen/>}/>
                    <Route path={'/project/:id'} element={<ProjectDetailScreen/>}/>
                    <Route path={'/profile'} element={<ProfileScreen/>}/>
                    <Route path={'/edit-profile'} element={<EditProfileScreen/>}/>
                    <Route path={'/payment/:id'} element={<PaymentScreen/>}/>
                </Route>
                <Route path={''} element={<AdminRoute/>}>
                    <Route path={'/add-category'} element={<AddCategoryScreen/>}/>
                    <Route path={'/add-project'} element={<AddProjectScreen/>}/>
                    <Route path={'/admin-categories'} element={<AdminCategoriesScreen/>}/>
                    <Route path={'/admin-projects'} element={<AdminProjectsScreen/>}/>
                    <Route path={'/admin-dashboard'} element={<AdminDashboardScreen/>}/>
                </Route>
            </Routes>
            </Elements>
        </Provider>
    </div>
  );
}

export default App;
