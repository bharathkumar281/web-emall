import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Main from './components/MainComponent';
import './App.css';


function App() {

  return (
    <Router>
      <div className="App">
        <Main />
      </div>
    </Router>
  );
}

export default App;