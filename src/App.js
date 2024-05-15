import { Route, Routes } from 'react-router-dom';

import HomeScreen from "./screens/home/HomeScreen";
import QuestionaryScreen from "./screens/questionary/QuestionaryScreen";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<HomeScreen/>}/>
        <Route path={'/quiz'} element={<QuestionaryScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
