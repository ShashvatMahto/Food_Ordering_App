import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name:"AuthSlice",
  initialState:{
    userData: JSON.parse(localStorage.getItem("userData")) || null
  },
  reducers:{
    addUserdata: ()=>{

    },

    removeUserData :()=>{

    }
  }
})
export default AuthSlice.reducer;
export const {addUserdata , removeUserData} = AuthSlice.actions;
