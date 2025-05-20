import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        //console.log(token);
        //console.log(user)
        const res = await axios.get(
          `http://localhost:8080/complaints/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        alert("Failed to load complaints.");
      }
    };
    fetchComplaints();
  }, [user.id, token]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 p-8">
      <h2 className="m-8 text-3xl font-bold mb-4 text-amber-500">📄 My Complaints</h2>
      {complaints.length === 0 ? (
        <p className="text-amber-600">You haven't filed any complaints yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {complaints.map((comp) => (
            <div key={comp.id} className="bg-gray-900 m-8 p-8 rounded-lg shadow-md border-2 border-gray-400">
              <p className="text-2xl text-white mt-2">Related to :  {comp.category}</p>
              <p className="text-2xl text-amber-500 mt-2">Description : {comp.description}</p>
              <p className="text-2xl text-green-600 mt-1">Status : {comp.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default ViewComplaints;