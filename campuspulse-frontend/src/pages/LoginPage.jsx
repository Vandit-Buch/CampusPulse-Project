import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        userName,
        password,
      });

      //console.log(response.data)
      const user = response.data.user;
      localStorage.setItem("user",JSON.stringify(user));
      const token = response.data.token;
      localStorage.setItem("token", token);
      if(user.role === "STUDENT"){
        navigate("/dashboard");
      }else if(user.role === "ADMIN"){
        navigate("/admin");
      }else{
        //console.log("Unknown role..")
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password.If you are not registered, register on the link below:");
      }else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-amber-400 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          CampusPulse Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-900 text-sm font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <p className="text-red-500 bg-gray-900 p-2 rounded-lg text-sm mb-4 text-">:( {error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>
        <button
            onClick={()=>navigate("/register")}
            className="w-full  bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition duration-200 my-3"
          >
            Register a new User
          </button>
      </div>
    </div>
    </>
  );
}
