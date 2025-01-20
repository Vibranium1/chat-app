import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path="/home" element={<Home/>} />
        <Route exact path="/" element={<Login/>} />
        <Route  path="/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
