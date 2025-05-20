import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ViewComplaintStatus = () => {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const fetchStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/complaints/status/${id}`);
      setStatus(res.data);
    } catch (err) {
      alert("Complaint not found.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">📌 View Complaint Status</h1>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Complaint ID"
          className="bg-gray-700 p-2 rounded mr-2" />
        <button onClick={fetchStatus} className="bg-yellow-700 px-4 py-2 rounded hover:bg-yellow-900">
          Check Status
        </button>

        {status && <p className="mt-4 text-lg">Status: <span className="font-semibold">{status}</span></p>}
      </div>
    </>
  );
};

export default ViewComplaintStatus;
