import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DA = () => {
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
          🧹 Data Cleaning & Dashboard
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
            Upload & Clean
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
          <div style={{ textAlign: "center", animation: "fadeIn 1s ease-in" }}>
            <h3 style={{ color: "#2563eb", marginBottom: "10px" }}>📊 Summary</h3>
            <p>
              <strong>Rows:</strong> {summary.rows} |{" "}
              <strong>Columns:</strong> {summary.columns}
            </p>

            <h3 style={{ color: "#2563eb", margin: "20px 0 10px" }}>
              📋 Columns
            </h3>
            <p style={{ color: "#444" }}>{summary.columns_list.join(", ")}</p>

            {summary.forecast && (
              <div
                style={{
                  background: "#e8f0fe",
                  borderRadius: "10px",
                  padding: "10px",
                  marginTop: "20px",
                  fontWeight: "500",
                  color: "#2563eb",
                }}
              >
                {summary.forecast}
              </div>
            )}

            <h3 style={{ color: "#2563eb", margin: "30px 0 10px" }}>
              🧾 Data Preview
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  margin: "0 auto",
                  borderCollapse: "collapse",
                  width: "100%",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <thead style={{ backgroundColor: "#5b9df9", color: "white" }}>
                  <tr>
                    {summary.columns_list.map((col, i) => (
                      <th
                        key={i}
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                          textTransform: "capitalize",
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {summary.preview.map((row, i) => (
                    <tr
                      key={i}
                      style={{
                        background: i % 2 === 0 ? "#f9fbfd" : "#ffffff",
                        transition: "background 0.3s",
                      }}
                    >
                      {summary.columns_list.map((col, j) => (
                        <td
                          key={j}
                          style={{
                            padding: "10px",
                            border: "1px solid #ddd",
                            fontSize: "0.95rem",
                          }}
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {summary.trend_data && (
              <>
                <h3 style={{ marginTop: "40px", color: "#2563eb" }}>
                  📈 Dashboard (AI Forecast Trend)
                </h3>
                <div
                  style={{
                    width: "85%",
                    margin: "0 auto",
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Bar
                    data={{
                      labels: summary.trend_data.labels,
                      datasets: [
                        {
                          label: "Value Trend",
                          data: summary.trend_data.values,
                          backgroundColor: summary.trend_data.labels.map(
                            (label, index) =>
                              index === summary.trend_data.labels.length - 1
                                ? "rgba(255,99,132,0.7)" // Highlight predicted value
                                : "rgba(91,157,249,0.7)"
                          ),
                          borderRadius: 5,
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
              </>
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

export default DA;
