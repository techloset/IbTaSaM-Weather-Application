import { createSlice } from "@reduxjs/toolkit";

// Create a slice to manage the search query state
const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "", // initialize search query as an empty string
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});
// Export actions and reducer
export const { updateQuery } = searchSlice.actions;
export const selectQuery = searchSlice.reducer;
// .query
