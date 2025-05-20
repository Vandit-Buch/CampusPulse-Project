import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ViewStatus = () => {
  const [complaintId, setComplaintId] = useState("");
    
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:8080/complaints/status/${complaintId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(res);
      setResponseMsg(res.data);
      setErrorMsg("");
    } catch (error) {
      //console.log(error);
      setErrorMsg(
        error.response?.data?.message || "Failed to update status. Try again."
      );
      setResponseMsg("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 h-screen py-8">
        <div className="max-w-md mx-auto mt-10 p-6 bg-amber-400  rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            View Complaint Status
          </h2>

          <div>
            <label className="block mb-1 font-bold">Complaint ID</label>
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              required
              className="w-full p-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700"
              placeholder="Enter complaint ID"
            />
          </div>

          

          <button
            onClick={handleSubmit}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            View Status
          </button>

          {responseMsg && (
            <p className="mt-4 text-green-500 bg-gray-900 text-center">{responseMsg}</p>
          )}
          {errorMsg && (
            <p className="mt-4 text-red-400 bg-gray-800 rounded-lg p-1 text-center">
              {errorMsg}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewStatus;
