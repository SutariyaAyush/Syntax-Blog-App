import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(value.payload));
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
