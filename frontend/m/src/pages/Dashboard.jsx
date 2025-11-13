import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/emails").then((res) => setEmails(res.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Scheduled Emails</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Email</th>
            <th>Subject</th>
            <th>Scheduled Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((e, i) => (
            <tr key={i} className="border-b text-center">
              <td>{e.recipient}</td>
              <td>{e.subject}</td>
              <td>{e.scheduled_time}</td>
              <td>{e.sent ? "✅ Sent" : "🕒 Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
