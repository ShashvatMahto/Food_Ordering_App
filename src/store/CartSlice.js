import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

function findExisting(cartItems, id) {
  return cartItems.find(data => data.id === id);
}
const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || "",
    isDiff: false
  },

  reducers: {
    addtoCart: (state, action) => {

      const existing = findExisting(state.cartItems, action.payload.id)
      if (!existing) {
        if (state.resInfo === action.payload.resInfo || state.resInfo === "") {
          state.resInfo = action.payload.resInfo;
          state.cartItems = [...state.cartItems, { ...action.payload }]
          localStorage.setItem("cartData", JSON.stringify([...state.cartItems]));
          localStorage.setItem("resInfo", JSON.stringify(state.resInfo))
          toast.success("item added");
          
        }
        else {
          state.isDiff = true;
        }

      }

      else {
        toast.error("item already added")
      }

      console.log(action.payload);


    },
    deleteItem: (state, action) => {

      if (state.cartItems.length >= 1) {
        state.cartItems.splice(action.payload, 1)
        localStorage.setItem("cartData", JSON.stringify([...state.cartItems]));
        toast.success("Item Removed")

        if(state.cartItems.length === 0){
          state.resInfo = "";
          localStorage.clear();
          toast.success("cart is empty" , {icon:"😔"})
          state.isDiff = false;
        }

      }
      
     

    },
    clearCart: (state) => {    
      state.cartItems = [];
      state.resInfo = "";
      localStorage.clear();
      toast.success("cart is empty" , {icon:"😔"})
      state.isDiff = false;
    },

    diffRest:(state)=>{
      state.isDiff=false;
    }
  }
})

export const { addtoCart, deleteItem, clearCart , diffRest } = CartSlice.actions
export default CartSlice.reducer;
