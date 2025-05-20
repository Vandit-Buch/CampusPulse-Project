import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8080/users/register", {
        userName,
        password,
        email,
        department,
        role,
      });

      alert("Registration successful! Please login.");
      navigate("/"); // Redirect after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md bg-amber-400 shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            CampusPulse Registration
          </h2>
          <form onSubmit={handleRegister}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter email"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Create a password"
              />
            </div>

            {/* Department */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-semibold mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="e.g., IT or CSE"
              />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-semibold mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                <option value="STUDENT">STUDENT</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 bg-gray-800 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition duration-200 text-xl"
            >
              Register
            </button>

            {/* Link to Login */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full mt-4 text-gray-800 underline hover:text-gray-900 cursor-pointer text-lg"
            >
              Already registered? Login here
            </button>
          </form>
        </div>
      </div>
    </>
  );
}