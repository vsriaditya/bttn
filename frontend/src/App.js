import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import ProtectedPage from "./ProtectedPage";

function App() {
  return (
    <Router>
        <div className="App-content">
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/secure" element={<ProtectedPage/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
