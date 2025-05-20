import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
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
        {" "}
        <h1 className="text-4xl font-bold mb-6">
          Welcome, {user?.userName || "Admin"} 👋
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/admin/complaints/all")}
            className="bg-blue-800 hover:bg-blue-950 text-white py-4 px-6 rounded-2xl text-2xl transition shadow"
          >
            Get All Complaints
          </button>

          <button
            onClick={() => navigate("/admin/complaints/student")}
            className="bg-violet-800 hover:bg-purple-950 w-full text-2xl p-6 rounded-2xl shadow-xl"
          >
            Get Complaints by a Student
          </button>

          <button
            onClick={() => navigate("/admin/complaints/update")}
            className="bg-green-600 hover:bg-green-800 w-full text-2xl p-6 rounded-2xl shadow-xl"
          >
            Update Complaint Status
          </button>

          <button
            onClick={() => navigate("/admin/complaints/status/view")}
            className="bg-yellow-700 hover:bg-yellow-900 w-full text-2xl p-6 rounded-2xl shadow-xl"
          >
            View Status of A Complaint
          </button>

          <button
            onClick={() => navigate("/admin/users/all")}
            className="bg-pink-700 hover:bg-pink-900 w-full text-2xl p-6 rounded-2xl shadow-xl"
          >
            View All Users
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-900 w-full text-2xl p-6 rounded-2xl shadow-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
