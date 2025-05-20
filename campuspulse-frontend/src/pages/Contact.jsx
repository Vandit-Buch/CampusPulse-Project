import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { FaG } from "react-icons/fa6";
const Contact = () => {
  const user = localStorage.getItem("user");
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen">
        <h1 className="text-4xl font-bold mb-7 text-white p-8">
          Welcome 👋
        </h1>
        <div className="container px-8 flex">
          <div className="rounded-xl w-1/2 p-5 h-50 border-2 border-gray-400 text-3xl text-amber-500 m-5">
            <div className="py-3 mx-5 my-2 float-left">
              <FaGithub className="h-30 w-30" />
            </div>
            <div className="m-15">
              <a
                className="p-3 m-6 hover:bg-amber-500 hover:text-gray-900 transition-normal rounded-xl"
                href="https://github.com/Vandit-Buch"
              >
                Vandit-Buch
              </a>
            </div>
          </div>
          <div className="rounded-xl w-1/2 p-5 h-50 border-2 border-gray-400 text-3xl text-amber-500 m-5">
            <div className="py-3 mx-5 my-2 float-left">
              <FaLinkedin className="h-30 w-30" />
            </div>
            <div className="m-15">
              <a
                className="p-3 m-6 hover:bg-amber-500 hover:text-gray-900 transition-normal rounded-xl"
                href="https://www.linkedin.com/in/vandit-b-5440952aa/"
              >
                Vandit Buch
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
