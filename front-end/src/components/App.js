import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//leave as lowercase so stays linked
import About from "./about";
import Title from "./title";
import HomepageFeed from "./HomepageFeed";

function App() {
  return (
    <div className="App">
      <Router>
        <Title />
        <Routes>
          <Route path="/" element={<HomepageFeed />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      <Nav />
    </div>
  );
}

export default App;
