import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  linked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLinked: (state, action) => {
      state.linked = action.payload;
    },
  },
});

export const { setLinked } = userSlice.actions;

export default userSlice.reducer;
