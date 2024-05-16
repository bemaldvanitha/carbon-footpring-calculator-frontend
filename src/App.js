import { Route, Routes } from 'react-router-dom';

import HomeScreen from "./screens/home/HomeScreen";
import QuestionaryScreen from "./screens/questionary/QuestionaryScreen";
import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/signup/SignupScreen";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path={'/'} element={<HomeScreen/>}/>
          <Route path={'/quiz'} element={<QuestionaryScreen/>}/>
          <Route path={'/login'} element={<LoginScreen/>}/>
          <Route path={'/signup'} element={<SignupScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
