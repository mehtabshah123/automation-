// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Forum from './components/Forum';
import Resources from './components/Resources';
import Features from './components/Features';
import Login from './components/Login';
import Admin from './components/Admin';
import Booking from './components/Booking';
import Footer from './components/Footer';
import EmailSchedulerForm from './components/EmailSchedulerForm'; // ✅ Import new component

import { LanguageProvider } from './Contexts/LanguageContext';
import './index.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Navbar />
        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/schedule-email" element={<EmailSchedulerForm />} /> {/* ✅ NEW ROUTE */}
          </Routes>
        </main>
        <Footer />
      </LanguageProvider>
    </Router>
  );
}

export default App;
