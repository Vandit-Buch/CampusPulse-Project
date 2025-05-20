import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/",{replace:true});
    // window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        {/* <div className="max-w-4xl mx-auto bg-gray-900 shadow-lg rounded-2xl p-10"> */}
        <h1 className="text-4xl font-bold mb-7 text-white">
          Welcome, {user?.userName || "Student"} 👋
        </h1>
        {/* <p className="text-gray-400 text-lg mb-8">Role: {user?.role || "Guest"}</p> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <button
            onClick={() => navigate("/complaints")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl text-2xl transition shadow"
          >
            📄 View Complaints
          </button>
          <button
            onClick={() => navigate("/add-complaint")}
            className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl text-2xl transition shadow"
          >
            ➕ Add Complaint
          </button>
          {/* <button
              onClick={() => navigate("/feedback")}
              className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl text-lg transition shadow"
            >
              💬 Give Feedback
            </button> */}
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-900 text-white py-4 px-6 rounded-xl text-2xl transition shadow"
          >
            🚪 Logout
          </button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          &copy; CampusPulse • 2025
        </p>
      </div>
      {/* </div> */}
    </>
  );
};

export default UserDashboard;
