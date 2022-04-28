import "./App.css";
import EditIntern from "./EditIntern";
import InternList from "./InternList";
import { Routes, Route } from "react-router-dom";
import Logo from "./logo.svg";
import React from "react";

function App() {
  return (
    <div className="App">
        <img src={Logo} alt="logo" className='logo'/>
      <Routes>
        <Route path="/interns/:id" exact element={<EditIntern />} />
        <Route path="/" element={<InternList />} />
      </Routes>
    </div>
  );
}

export default App;
