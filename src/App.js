import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homepage.js';
import AuditPage from './Audit.js';
import Footer from './footer';
import Header from './header.js';
import './skulls-and-crossbones-font/fonts.css'; // Import the fonts CSS fil
import Results from './Results.js';
import History from './history.js';
import AuditHistory from './audithistory.js';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/audithistory" element={<AuditHistory />} />
          <Route path="/history.js" element={<History/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
