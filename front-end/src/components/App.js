import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about";
import Title from "./title";
import HomepageFeed from "./HomepageFeed";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Title />
        <Routes>
          <Route path="/" element={<HomepageFeed />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element = {<SignUp />} />;
        </Routes>
      </Router>
    </div>
  );
}

export default App;
