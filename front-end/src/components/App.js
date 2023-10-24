import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './about';
import Title from './title';
import Song from './Song';

function App() {
  return (
    <div className="App">
      <Router>
        <Title/>
        <Routes>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/song" element={<Song/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
