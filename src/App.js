import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";

import HomeScreen from "./screens/home/HomeScreen";
import QuestionaryScreen from "./screens/questionary/QuestionaryScreen";
import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/signup/SignupScreen";
import PrivateRoute from "./components/routing/PrivateRoute";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import ProjectDetailScreen from "./screens/project/ProjectDetailScreen";

import store from "./store";

import './App.css';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Routes>
                <Route path={'/'} element={<HomeScreen/>}/>
                <Route path={'/quiz'} element={<QuestionaryScreen/>}/>
                <Route path={'/login'} element={<LoginScreen/>}/>
                <Route path={'/signup'} element={<SignupScreen/>}/>
                <Route path={''} element={<PrivateRoute/>}>
                    <Route path={'/dashboard'} element={<DashboardScreen/>}/>
                    <Route path={'/project/:id'} element={<ProjectDetailScreen/>}/>
                </Route>
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
