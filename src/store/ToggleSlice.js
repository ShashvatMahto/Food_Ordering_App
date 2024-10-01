import { createSlice } from "@reduxjs/toolkit";

const ToggleSlice = createSlice({
  name:"ToggleSlice",
  initialState:{
    searchToggle:false,
    loginToggle : false,
  },
  reducers:{
    toggleSearch:(state)=>{
      state.searchToggle = !state.searchToggle;
    },

    toggleLogin: (state)=>{
      state.loginToggle = !state.loginToggle;
    }
  }
})

export const {toggleSearch , toggleLogin} = ToggleSlice.actions;
export default ToggleSlice.reducer;
