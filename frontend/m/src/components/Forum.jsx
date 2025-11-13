import React, { useState } from "react";
import axios from "axios";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    recipient: "",
    subject: "",
    message: "",
    scheduled_time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:5000/schedule", formData);
    alert("Email scheduled successfully!");
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          font-family: "Poppins", sans-serif;
        }

        .email-form-container {
          background-color: #ffffff;
          padding: 30px;
          margin: 60px auto;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .email-form-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .email-form-container h2 {
          text-align: center;
          color: #1565c0;
          font-size: 26px;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .email-form-container input,
        .email-form-container textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid #90caf9;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.2s ease-in-out;
          background-color: #f9fbfd;
        }

        .email-form-container input:focus,
        .email-form-container textarea:focus {
          outline: none;
          border-color: #1e88e5;
          box-shadow: 0 0 6px rgba(30, 136, 229, 0.4);
        }

        .email-form-container button {
          width: 100%;
          background-color: #1e88e5;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s ease-in-out;
        }

        .email-form-container button:hover {
          background-color: #1565c0;
          transform: translateY(-2px);
        }

        .email-form-container form > *:not(:last-child) {
          margin-bottom: 15px;
        }
      `}</style>

      <div className="email-form-container">
        <h2>Schedule an Email</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="recipient"
            placeholder="Recipient Email"
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="scheduled_time"
            onChange={handleChange}
          />
          <button type="submit">Schedule Email</button>
        </form>
      </div>
    </>
  );
};

export default EmailForm;
