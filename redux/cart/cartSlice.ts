import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface Ratings {
  star: number;
  feedback: string;
  date: Date;
  username: string;
  usernameid: string;
  itemid: string;
}

export interface Product {
  productid: string;
  productName: string;
  seller: string;
  imageLink: string[];
  description: string;
  inStock: number;
  variations?: Product[];
  ratings: Ratings[]
}

export interface ShoppingCartInitialState {
  cart: Product[];
}

const initialState: ShoppingCartInitialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter((item) => item.productid != action.payload.productid);
    },
  },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer