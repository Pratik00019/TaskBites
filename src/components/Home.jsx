import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBites } from "../features/biteSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import "../../src/App.css"; // Import the custom CSS for toast positioning

import { v4 as uuidv4 } from "uuid";

function Home() {
  const dispatch = useDispatch();
  const [bite, setbite] = useState({ id: "", title: "", description: "" });
  const bites = useSelector((state) => state.bites);

  const id = uuidv4();
  
  const handleInputOnChange = (e) => {
    setbite({ ...bite, id, title: e.target.value });
  };

  const handleTextOnChange = (e) => {
    setbite({ ...bite, id, description: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addToBites(bite));
    setbite({ id: "", title: "", description: "" });
  };

  useEffect(() => {
    if (bites.length > 0) {
      localStorage.setItem("bite", JSON.stringify(bites));
    }
  }, [bites]);

  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="h-[500px] w-[500px] bg-gray-800 shadow-lg rounded-lg p-5 border border-gray-700 mt-[4.5rem]">
      <h1 className="text-2xl font-bold text-center mb-5">
          <span className="text-white">Task</span>
          <span className="text-cyan-400">Bites</span>
        </h1>
        <div className="flex gap-5 mb-5">
          <textarea
            className="w-full border-2 border-cyan-500 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none overflow-y-auto"
            placeholder="Enter your title"
            onChange={(e) => handleInputOnChange(e)}
            value={bite.title}
          />
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-lg w-20 hover:from-cyan-600 hover:to-blue-600 transition duration-300 shadow-lg transform hover:scale-105"
            onClick={() => handleSubmit()}
          >
            Add
          </button>
        </div>
        <textarea
          className="w-full border-2 border-cyan-500 p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
          placeholder="Enter your description"
          rows="12"
          onChange={(e) => handleTextOnChange(e)}
          value={bite.description}
        ></textarea>
      </div>
      <ToastContainer className="custom-toast-container" />
    </div>
  );
}

export default Home;
