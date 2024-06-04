// requestsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [], // Initial state for requests
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    updateRequestStatus: (state, action) => {
      const updatedRequest = action.payload;
      // Update the request status in the store
      state.requests = state.requests.map((req) =>
        req._id === updatedRequest._id
          ? { ...req, status: updatedRequest.status }
          : req
      );
    },
    initializeRequests: (state, action) => {
      state.requests = action.payload; // Initialize requests array
    },
  },
});

export const { updateRequestStatus, initializeRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
