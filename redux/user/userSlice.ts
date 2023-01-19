import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

export interface User {
  name: string;
  dateCreated: Date;
  uid: string;
  email: string;
  authProvider: string;
  loggedIn: boolean;
  id: string;
}

const initialState = {
  user: {
    name: "",
    dateCreated: new Date(),
    uid: "",
    email: "",
    authProvider: "",
    loggedIn: false,
    id: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<User>) => {
      const userAuth = {
        name: action.payload.name,
        dateCreated: action.payload.dateCreated,
        uid: action.payload.uid,
        email: action.payload.email,
        authProvider: action.payload.authProvider,
        loggedIn: true,
        id: action.payload.id,
      };
      state.user = userAuth;
    },
    userLoggedOut: (state, action: PayloadAction<User>) => {
      const outUser = {
        name: "",
        dateCreated: new Date(),
        uid: "",
        email: "",
        authProvider: "",
        loggedIn: false,
        id: "",
      };
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;
