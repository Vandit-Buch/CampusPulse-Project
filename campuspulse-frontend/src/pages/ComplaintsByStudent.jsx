import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { CiSearch } from "react-icons/ci";


const ComplaintsByStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("token")
  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/admin/complaints/student/${studentId}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      //console.log(res);      
      setComplaints(res.data);
    } catch (err) {
      alert("Error fetching complaints for student.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <div className="flex"><CiSearch className="m-1 h-8 w-8"/><h1 className="text-3xl font-bold mb-6"> Complaints by Student</h1></div>
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          className="p-2 rounded bg-gray-700 text-white mb-4 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-900">
          Search
        </button>

        <div className="mt-6">
          {complaints.map((comp) => (
            <div key={comp.id} className="bg-gray-800 p-4 mb-3 rounded-xl">
              <h2 className="text-xl font-semibold">{comp.title}</h2>
              <p>{comp.description}</p>
              <p className="text-green-400">Status: {comp.status}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComplaintsByStudent;