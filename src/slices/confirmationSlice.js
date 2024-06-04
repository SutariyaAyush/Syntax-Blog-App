import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmationModal: null,
};

const confirmationSlice = createSlice({
  name: "confirmationModal",
  initialState: initialState,
  reducers: {
    setConfirmationModal(state, action) {
      state.confirmationModal = action.payload;
    },
  },
});

export const { setConfirmationModal } = confirmationSlice.actions;
export default confirmationSlice.reducer;
