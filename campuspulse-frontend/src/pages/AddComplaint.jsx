import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddComplaint = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [category, setCategory] = useState("LAB");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaintData = {
      category,
      description,
      studentId: user.id, // important!
      status: "OPEN", // default status
    };

    try {
      //console.log(complaintData);
      
      await axios.post("http://localhost:8080/complaints/add", complaintData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Complaint filed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error filing complaint:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="bg-amber-400 p-8 rounded-xl shadow-md w-full max-w-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 ">
            ➕ File a Complaint
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-3 rounded-md"
            >
              <option
                value="LAB"
                className="bg-gray-900 text-amber-500 font-semibold"
              >
                LAB
              </option>
              <option
                value="CAMPUS"
                className="bg-gray-900 text-amber-500 font-semibold"
              >
                CAMPUS
              </option>
              <option
                value="HOSTEL"
                className="bg-gray-900 text-amber-500 font-semibold"
              >
                HOSTEL
              </option>
            </select>
            <textarea
              placeholder="Complaint Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border p-3 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-950 text-white py-3 px-6 rounded-md"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddComplaint;
