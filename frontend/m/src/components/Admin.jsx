import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../index.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Admin = () => {
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState({
    totalEmails: 0,
    sentEmails: 0,
    pendingEmails: 0,
    activeUsers: 0,
    totalUploads: 0,
  });

  // Fetch Email Data
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/emails");
        const allEmails = res.data;
        const sent = allEmails.filter((e) => e.sent).length;
        const pending = allEmails.filter((e) => !e.sent).length;
        setEmails(allEmails);
        setStats((prev) => ({
          ...prev,
          totalEmails: allEmails.length,
          sentEmails: sent,
          pendingEmails: pending,
        }));
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      }
    };

    fetchEmails();
  }, []);

  // Mock additional data (for now)
  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      activeUsers: 58,
      totalUploads: 12,
    }));
  }, []);

  return (
    <div className="admin-page container" style={{ padding: "2rem" }}>
      <h1 className="page-title" style={{ textAlign: "center", color: "#2563eb" }}>
        🧠 Admin Dashboard
      </h1>
      <p className="page-description" style={{ textAlign: "center" }}>
        Real-time insights on system performance, user activity, and email analytics.
      </p>

      {/* Top Stats Cards */}
      <div
        className="admin-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        <div className="card admin-card">
          <h2>Total Emails</h2>
          <p className="metric-number">{stats.totalEmails}</p>
          <p className="metric-trend">+5 new this week</p>
        </div>

        <div className="card admin-card">
          <h2>Sent Emails</h2>
          <p className="metric-number" style={{ color: "#22c55e" }}>
            {stats.sentEmails}
          </p>
          <p className="metric-trend">Successfully delivered</p>
        </div>

        <div className="card admin-card">
          <h2>Pending Emails</h2>
          <p className="metric-number" style={{ color: "#f59e0b" }}>
            {stats.pendingEmails}
          </p>
          <p className="metric-trend">Waiting to be sent</p>
        </div>

        <div className="card admin-card">
          <h2>Active Users</h2>
          <p className="metric-number">{stats.activeUsers}</p>
          <p className="metric-trend">Currently logged in</p>
        </div>

        <div className="card admin-card">
          <h2>Data Uploads</h2>
          <p className="metric-number">{stats.totalUploads}</p>
          <p className="metric-trend">This month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div
        className="admin-chart-section"
        style={{
          marginTop: "3rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Email Trends Line Chart */}
        <div className="card admin-chart-card">
          <h2>Email Activity Trend</h2>
          <Line
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  label: "Emails Sent",
                  data: [5, 8, 3, 6, 10, 7, 9],
                  borderColor: "#2563eb",
                  tension: 0.3,
                  fill: false,
                },
                {
                  label: "Emails Pending",
                  data: [2, 1, 4, 2, 0, 1, 0],
                  borderColor: "#f59e0b",
                  tension: 0.3,
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
              },
            }}
          />
        </div>

        {/* System Usage (Bar Chart) */}
        <div className="card admin-chart-card">
          <h2>System Usage Overview</h2>
          <Bar
            data={{
              labels: ["Chatbot", "Dashboard", "Upload", "Email", "Admin"],
              datasets: [
                {
                  label: "Usage Count",
                  data: [87, 42, 12, stats.totalEmails, 10],
                  backgroundColor: [
                    "#2563eb",
                    "#3b82f6",
                    "#60a5fa",
                    "#93c5fd",
                    "#bfdbfe",
                  ],
                  borderRadius: 8,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        {/* Email Sent vs Pending (Doughnut) */}
        <div className="card admin-chart-card">
          <h2>Email Distribution</h2>
          <Doughnut
            data={{
              labels: ["Sent", "Pending"],
              datasets: [
                {
                  data: [stats.sentEmails, stats.pendingEmails],
                  backgroundColor: ["#22c55e", "#f59e0b"],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
              },
            }}
          />
        </div>
      </div>

      {/* Logs Section */}
      <div
        className="card admin-logs-card"
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          background: "linear-gradient(90deg, #f0f9ff, #e0f2fe)",
        }}
      >
        <h2 style={{ color: "#2563eb" }}>🪶 System Logs</h2>
        <ul>
          <li>[2025-11-07 10:30] Email service executed successfully.</li>
          <li>[2025-11-07 09:15] Chatbot handled 87 active sessions.</li>
          <li>[2025-11-06 18:00] User uploaded sales_data.csv.</li>
          <li>[2025-11-06 14:00] Admin logged in.</li>
        </ul>
        <button
          className="btn"
          style={{
            marginTop: "10px",
            background: "#2563eb",
            color: "white",
            borderRadius: "8px",
            padding: "8px 15px",
            cursor: "pointer",
            border: "none",
          }}
        >
          View Full Logs
        </button>
      </div>
    </div>
  );
};

export default Admin;
