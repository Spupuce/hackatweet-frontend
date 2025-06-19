import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log("reducer loginUser action.payload", action.payload)
      state.value = action.payload;
    },
    logoutUser: (state) => {
      state.value = {};
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
