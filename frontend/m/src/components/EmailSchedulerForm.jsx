import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function DataCleaning() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [chartData, setChartData] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setMessage("Uploading and cleaning data...");
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Data cleaned successfully!");
      setChartData(response.data.chartData); // from Flask API
    } catch (error) {
      console.error(error);
      setMessage("Error cleaning data");
    }
  };

  return (
    <div className="container mt-5">
      <h2>🧹 Data Cleaning</h2>
      <p>Upload your dataset, and I’ll clean it automatically!</p>

      <div className="mb-3">
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload & Clean
      </button>

      {message && <p className="mt-3">{message}</p>}

      {chartData && (
        <div className="mt-4">
          <h4>📊 Missing Values Summary</h4>
          <Bar
            data={{
              labels: chartData.columns,
              datasets: [
                {
                  label: "Missing Values",
                  data: chartData.values,
                  backgroundColor: "rgba(75,192,192,0.6)",
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DataCleaning;
