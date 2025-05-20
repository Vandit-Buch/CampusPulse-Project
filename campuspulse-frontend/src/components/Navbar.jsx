import React from "react";
import Contact from "../pages/Contact";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="text-blue-950 body-font bg-amber-400">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a
            onClick={()=>navigate("/")}
            className="mx-3 text-4xl p-2 font-semibold hover:font-bold cursor-pointer"
          >
            CampusPulse
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a
              className="mr-5 text-xl hover:text-black hover:font-bold cursor-pointer"
              onClick={()=>navigate("/")}
            >
              Home
            </a>
            <a
              className="mr-5 text-xl hover:text-black hover:font-bold cursor-pointer"
              onClick={()=>navigate("/contact")}
            >
              Contact
            </a>
            <a
              className="mr-5 text-xl hover:text-black hover:font-bold cursor-pointer"
              href="https://github.com/Vandit-Buch/CampusPulse.git"
            >
              Codebase
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
