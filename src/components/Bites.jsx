import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import "../../src/App.css"; // Import the custom CSS for toast positioning
import { deleteFromBites, updateBite } from "../features/biteSlice";


function Bites() {
  
  const dispatch = useDispatch();
  var bites = useSelector((state) => state.bites);


  const notify = () => {

    toast.info("Bite Description Copied",
      {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleCopy = (title) => {
    window.navigator.clipboard.writeText(title).then(() => {
      notify();
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteFromBites(id));
  };
  const [editId, setEditId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");

  const handleEdit = (bite) => {
    setEditId(bite.id);
    setEditTitle(bite.title);
    setEditDescription(bite.description);
  };

  const handleSave = (id) => {
    dispatch(updateBite({ id, title: editTitle, description: editDescription }))
    if(editTitle !== "" && editDescription !== ""){
      setEditId(null);
    }
  };

  useEffect(() => {
    localStorage.setItem("bite", JSON.stringify(bites));
  }, [bites])
  
  return (
    <div className="h-screen bg-gray-900 flex justify-center items-center">
      <div className="h-[500px] w-[500px] bg-gray-800 shadow-lg rounded-lg p-5 border border-gray-700 mt-[4.5rem]">
        <div className="h-[98%] border-2 border-cyan-500 p-3 rounded-md bg-gray-700 text-white">
          <h1 className="text-3xl font-extrabold text-cyan-400 mb-4 text-center">
            Bites
          </h1>
          <div className="space-y-4 h-[80%] overflow-y-auto overflow-x-hidden">
            {bites.length === 0 ? (
              <div className="flex justify-center items-center h-[100%] text-lg font-medium">
                <span className="mr-1">No</span>
                <span className="text-cyan-400 mr-1">Bites</span>
                <span>to Display</span>
              </div>
            ) : (
              bites.map((bite) => ( 
                <div
                  key={bite.id}
                  className="bg-white p-4 rounded shadow-lg border border-gray-300 w-full"
                >
                  <div className="flex justify-between items-baseline overflow-y-auto overflow-auto">
                    <div>
                      <div className="block text-gray-600 font-bold">
                        Title:
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center relative ">
                      {editId === bite.id ? (
                        <button
                          onClick={() => handleSave(bite.id)}
                          className="text-blue-500 cursor-pointer"
                        >
                          Save
                        </button>
                      ) : (
                        <FaEdit
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleEdit(bite)}
                        />
                      )}
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(bite.id)}
                      />
                      <FaCopy
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleCopy(bite.description)}
                      />
                    </div>
                  </div>
                  <div className="overflow-auto">
                    {editId === bite.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-xl font-semibold text-gray-800 px-2 py-1 focus:outline-none w-full"
                      />
                    ) : (
                      <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                          {bite.title}
                        </h1>
                      </div>
                    )}
                  </div>
                  <hr className="my-2 border-gray-300" />
                  <div className="mt-2 overflow-y-auto overflow-x-hidden">
                    <label className="block text-gray-600 font-bold">
                      Description:
                    </label>
                    {editId === bite.id ? (
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={4}
                        className="text-gray-700 break-words w-full focus:outline-none "
                      />
                    ) : (
                      <p className="text-gray-700 break-words">
                        {bite.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer className="custom-toast-container" />
    </div>
  );
}

export default Bites;
