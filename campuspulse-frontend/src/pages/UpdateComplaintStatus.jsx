import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const UpdateComplaintStatus = () => {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [context, setContext] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8080/admin/complaints/change", {
        id, status, context
      });
      alert("Status updated successfully!");
    } catch (err) {
      alert("Failed to update complaint status");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">🛠 Update Complaint Status</h1>
        <div className="space-y-4">
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Complaint ID"
            className="bg-gray-700 p-2 rounded w-full" />
          <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="New Status"
            className="bg-gray-700 p-2 rounded w-full" />
          <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Context or Remarks"
            className="bg-gray-700 p-2 rounded w-full" />

          <button onClick={handleUpdate} className="bg-green-600 px-4 py-2 rounded hover:bg-green-800">
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateComplaintStatus;