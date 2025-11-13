import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export default function ScheduleWhatsApp() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks
  const loadTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.startsWith("+")) {
      alert("Phone number must start with + and country code (e.g. +91...)");
      return;
    }

    try {
      await axios.post(`${API_URL}/schedule`, {
        phone_number: phone,
        message,
        scheduled_time: time,
      });
      alert("Message scheduled!");
      setPhone("");
      setMessage("");
      setTime("");
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Error scheduling message");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>📅 WhatsApp Message Scheduler</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Phone Number:</label><br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            required
            style={{ width: "250px", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Message:</label><br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
            rows="3"
            style={{ width: "250px", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Schedule Time:</label><br />
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={{ width: "250px", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "15px",
            backgroundColor: "#25D366",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Schedule
        </button>
      </form>

      <h3>📋 Scheduled Messages</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.phone_number} — {t.message} — {t.scheduled_time} — Sent:{" "}
            {t.sent ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}
