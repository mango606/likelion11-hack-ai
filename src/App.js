import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";

import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/"  element={<Main />} />
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      </div>
    
    </BrowserRouter>

  );
}

export default App;
