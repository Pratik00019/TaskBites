import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import { toast } from "react-toastify";


const initialState = localStorage.getItem("bite")
  ? JSON.parse(localStorage.getItem("bite"))
  : [];

const isEmptyPayload = (title,description) =>{
  if(!title || !description){
    notifyForNotEmpty();
    return true;
  }
  return false
}

const notifyForNotEmpty = () => {
  toast.error("Title and Description cannot be empty!", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
})};

const notifyForAdded = () => {
  toast.success("Bite Added successfully!", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const notifyForDeleted = () => {
  toast.info("Bite Deleted successfully!", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type:"error"
  });
};

const notifyForUpdated = () => {
  toast.success("Note Updated successfully!", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const bite = createSlice({
  name: "bites",
  initialState,
  reducers: {
    addToBites: (state, action) => {
      if(isEmptyPayload(action.payload.title,action.payload.description)){
        return
      }   
      console.log(state);
      state.push(action.payload);
      notifyForAdded();
    },
    deleteFromBites: (state, action) => {
      const id = action.payload;
      notifyForDeleted();
      return state.filter((bite) => {
        return bite.id != id;
      });
     
      
    },
    updateBite: (state, action) => {
      if(isEmptyPayload(action.payload.title,action.payload.description)){
        return
      }      
      state.map((s) => {
        if (s.id == action.payload.id) {
          s.title = action.payload.title;
          s.description = action.payload.description;
          notifyForUpdated()
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBites, deleteFromBites, updateBite } = bite.actions;

export default bite.reducer;
