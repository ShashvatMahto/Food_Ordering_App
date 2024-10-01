import { configureStore } from "@reduxjs/toolkit";
import ToggleSlice from "./ToggleSlice";
import CartSlice from "./CartSlice";
import FilterSlice from "./FilterSlice";
import Authentication from "./Authentication";



export const store = configureStore({
  reducer:{
    ToggleSlice:ToggleSlice,
    CartSlice:CartSlice,
    FilterSlice,
    Authentication,
  }
})
