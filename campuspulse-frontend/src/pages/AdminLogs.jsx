// src/pages/admin/AdminLogs.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();    
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/logs");
      setLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Admin Logs</h2>
      {logs.length === 0 ? (
        <p className="text-gray-600">No logs available.</p>
      ) : (
        <div className="space-y-4">
          {logs.map((log, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-300 rounded-lg p-4 shadow-sm"
            >
              <p className="font-semibold text-blue-900">Action: {log.action}</p>
              <p className="text-sm text-gray-700">User: {log.userName}</p>
              <p className="text-sm text-gray-600">Time: {formatDate(log.timestamp)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}