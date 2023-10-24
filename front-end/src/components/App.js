import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Title from "./Title";
import HomepageFeed from "./HomepageFeed";

function App() {
  return (
    <div className="App">
      <Router>
        <Title />
        <Routes>
          <Route path="/" element={ <HomepageFeed />} />
          <Route path="/about" element={ <About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
