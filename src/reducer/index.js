import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import confirmationReducer from "../slices/confirmationSlice";
import requestsReducer from "../slices/requestsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  confirmation: confirmationReducer,
  requests: requestsReducer,
});

export default rootReducer;
