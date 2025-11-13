// src/components/Resources.jsx
import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Resources = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select a CSV file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(res.data.summary);
      setError("");
    } catch (err) {
      setError("❌ Failed to upload or clean file.");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(180deg, #f9fbfd, #e3f2fd)",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "#1a1a1a",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
          padding: "30px 40px",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#2563eb",
            fontSize: "2rem",
            marginBottom: "20px",
          }}
        >
          🧠 AI Data Forecast Dashboard
        </h2>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{
              padding: "10px",
              border: "2px dashed #2563eb",
              borderRadius: "10px",
              backgroundColor: "#f0f7ff",
              cursor: "pointer",
              fontWeight: "500",
            }}
          />
          <button
            onClick={handleUpload}
            style={{
              marginLeft: "10px",
              background: "linear-gradient(90deg, #5b9df9, #74d680)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 10px rgba(91,157,249,0.3)",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #74d680, #5b9df9)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(90deg, #5b9df9, #74d680)")
            }
          >
            Upload & Predict
          </button>
        </div>

        {error && (
          <p
            style={{
              color: "red",
              fontWeight: "500",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        {summary && (
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#2563eb", marginBottom: "10px" }}>📊 Summary</h3>
            <p>
              <strong>Rows:</strong> {summary.rows} |{" "}
              <strong>Columns:</strong> {summary.columns}
            </p>

            <h3 style={{ color: "#2563eb", margin: "20px 0 10px" }}>📋 Columns</h3>
            <p style={{ color: "#444" }}>{summary.columns_list.join(", ")}</p>

            <div
              style={{
                marginTop: "30px",
                padding: "15px",
                background: "#e3f2fd",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                color: "#004aad",
                fontWeight: "600",
                fontSize: "1.1rem",
              }}
            >
              {summary.forecast}
            </div>

            {/* Line Chart for Trend */}
            {summary.trend_data && (
              <div
                style={{
                  width: "85%",
                  margin: "40px auto",
                  background: "#ffffff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ color: "#2563eb" }}>📈 Trend Visualization</h3>
                <Line
                  data={{
                    labels: summary.trend_data.labels,
                    datasets: [
                      {
                        label: "Data Trend (Predicted Next Value Highlighted)",
                        data: summary.trend_data.values,
                        fill: false,
                        borderColor: "rgba(91,157,249,1)",
                        tension: 0.3,
                        pointBackgroundColor: ["rgba(91,157,249,1)", "orange"],
                        pointRadius: 5,
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
            )}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Resources;
