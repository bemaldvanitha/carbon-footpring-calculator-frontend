import { Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";

import HomeScreen from "./screens/home/HomeScreen";
import QuestionaryScreen from "./screens/questionary/QuestionaryScreen";
import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/signup/SignupScreen";

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
            </Routes>
        </Provider>
    </div>
  );
}

export default App;
