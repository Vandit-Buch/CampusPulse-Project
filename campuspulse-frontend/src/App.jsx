import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddComplaint from "./pages/AddComplaint";
import ViewComplaints from "./pages/ViewComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import UserDashboard from "./pages/UserDashboard";
import Contact from "./pages/Contact";
import Configs from "./pages/Configs";
import AllComplaints from "./pages/AllComplaints";
import ComplaintsByStudent from "./pages/ComplaintsByStudent";
import UpdateStatus from "./pages/UpdateStatus";
import ViewStatus from "./pages/ViewStatus";
import AllUsers from "./pages/AllUsers";

function App() {
  const location = useLocation();
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(()=>{setLoading(false)},800)
  
    return () => clearTimeout(timeout)
    
  }, [location.pathname])
  
  return (
    <>
      {loading && <Loader/>}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add-complaint" element={<AddComplaint />} />
        <Route path="/complaints" element={<ViewComplaints />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/configs" element={<Configs />} />
        <Route path="/admin/complaints/all" element={<AllComplaints/>}/>
        <Route path="/admin/complaints/student" element={<ComplaintsByStudent/>}/>
        <Route path="/admin/complaints/update" element={<UpdateStatus/>}/>
        <Route path="/admin/complaints/status/view" element={<ViewStatus/>}/>
        <Route path="/admin/users/all" element={<AllUsers/>}/>
      </Routes>
    </>
  );
}

export default App;
