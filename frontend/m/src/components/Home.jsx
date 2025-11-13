// src/components/Home.jsx
import React, { useState, useEffect } from "react"; // ✅ Import hooks
import { Link } from "react-router-dom";
import "../index.css"; // Ensure this path is correct

const Home = () => {
  // Step 1: State to store backend data
  const [message, setMessage] = useState("");

  // Step 2: Call Flask backend API when component loads
  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error connecting to backend:", err));
  }, []);

  // Step 3: Send data to backend (on button click)
  const sendData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "Mehtab Shah", project: "Automation Bot" }),
      });
      const result = await response.json();
      console.log("Response from backend:", result);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="home-page">
      {/* Backend message */}
      <div style={{ textAlign: "center", marginTop: "20px", color: "green" }}>
        <h2>{message}</h2>
      </div>

      {/* Hero Banner */}
      <header className="hero-banner">
        <div className="container">
          <h1>AutoFlow AI: The Future of Smart Automation</h1>
          <p>
            Transform repetitive tasks into intelligent workflows powered by AI.
          </p>
          <div className="hero-buttons">
            <Link to="/chatbot" className="btn btn-primary">
              Talk to our Chatbot
            </Link>
          
          </div>

        
        </div>
      </header>

      {/* Quick Navigation */}
      <section className="quick-navigation container">
        <h2>Quick Navigation</h2>
        <div className="nav-cards-grid">
          <div className="card nav-card">
            <h3>Email Automation</h3>
            <p>Send professional emails automatically using SMTP & scheduling.</p>
            <Link to="/" className="btn">
              Send Email
            </Link>
          </div>
          <div className="card nav-card">
            <h3>ChatBot</h3>
            <p>
              Automate WhatsApp messages to friends, family, or clients at
              selected times.
            </p>
            <Link to="/Forum" className="btn">
              Try WhatsApp
            </Link>
          </div>
          <div className="card nav-card">
            <h3>Data Analyst</h3>
            <p>
              CleanSheets or Excel files automatically with one click.
            </p>
            <Link to="/sheets" className="btn">
              Update Sheet
            </Link>
          </div>
        
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2>Why Choose Our Bot?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📧</div>
            <h3>Automated Emails</h3>
            <p>
              Schedule and send error-free emails using your Gmail account
              securely.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>WhatsApp Messaging</h3>
            <p>
              Connect instantly with people at your preferred time slots using
              automation.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Sheet Updater</h3>
            <p>
              Auto-update your Google Sheets or Excel tables with fresh data.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Reports on Demand</h3>
            <p>
              Generate detailed reports in PDF/Excel format — saving hours of
              manual work.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer"></footer>
    </div>
  );
};

export default Home;
