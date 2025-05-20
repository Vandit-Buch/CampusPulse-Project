import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaUsers } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token")

  useEffect(() => {
    axios.get("http://localhost:8080/admin/users/all",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to load users:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <div className="flex"><div className="m-1 mx-3"><FaUsers className="h-8 w-8"/></div><h1 className="text-3xl font-bold mb-6"> All Users</h1></div>
        {users.map(user => (
          <div key={user.id} className="bg-gray-800 p-4 rounded-xl mb-4">
            <p><strong>Name:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Student ID:</strong> {user.id}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllUsers;