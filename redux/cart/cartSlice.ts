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
  ratings: Ratings[];
  price: number;
}

export interface ShoppingCartItem {
  product: Product;
  count: number;
}

export interface ShoppingCartInitialState {
  cart: ShoppingCartItem[];
}

const initialState: ShoppingCartInitialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].product.productid === action.payload.productid) {
          state.cart[i].count += 1;
          return;
        }
      }
      state.cart.push({ product: action.payload, count: 1 });
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.cart = state.cart.filter(
        (item) => item.product.productid != action.payload.productid
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
