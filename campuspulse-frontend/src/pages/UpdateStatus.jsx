import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const UpdateStatus = () => {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("OPEN");
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/complaints/change",
        {
          id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(res);
      setResponseMsg("Status updated successfully!");
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
    <Navbar/>
    <div className="bg-gray-900 h-screen py-8">
    <div className="max-w-md mx-auto mt-10 p-6 bg-amber-400  rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
        Update Complaint Status
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Complaint ID</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
            placeholder="Enter complaint ID"
          />
        </div>

        <div>
          <label className="block mb-1">New Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Update Status
        </button>
      </form>

      {responseMsg && (
        <p className="mt-4 text-green-500 font-bold bg-gray-900 text-center">{responseMsg}</p>
      )}
      {errorMsg && <p className="mt-4 text-red-400 bg-gray-800 rounded-lg p-1 text-center">{errorMsg}</p>}
    </div>
    </div>
    </>
  );
};

export default UpdateStatus;
