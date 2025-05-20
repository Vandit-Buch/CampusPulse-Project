import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        //console.log(token);
        
        const res = await axios.get(
          "http://localhost:8080/admin/complaints/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(res);        
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-6">📋 All Complaints</h1>
        {complaints.map((comp) => (
          <div
            key={comp.id}
            className="bg-gray-800 p-4 mb-4 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-amber-400">{comp.category}</h2>
            <p>{comp.description}</p>
            <p className="text-green-400">
              Status: <span className="font-medium">{comp.status}</span>
            </p>
            <p>Submitted By: {comp.studentId}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllComplaints;
