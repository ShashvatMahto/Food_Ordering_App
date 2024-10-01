import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const AuthenticationSlice = createSlice({

  name:"AuthenticationSlice",
  initialState:{
    userData: JSON.parse(localStorage.getItem("userData")) || null 
  },
  reducers:{
    addUserdata: (state , action)=>{
        console.log(action.payload);
        
        state.userData = action.payload;
        localStorage.setItem("userData" , JSON.stringify(action.payload));
        toast.success("logged In successfully")
    },

    removeUserData :(state)=>{
      state.userData = null;
      localStorage.removeItem("userData");
      toast.success("logged Out")
    }
  }
})

export default AuthenticationSlice.reducer;
export const {addUserdata , removeUserData} = AuthenticationSlice.actions