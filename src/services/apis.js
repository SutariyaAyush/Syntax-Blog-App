const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  //   SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: "http://localhost:4000/auth/signup",
  LOGIN_API: "http://localhost:4000/auth/login",
  CREATE_API: "http://localhost:4000/request/createRequest",
  GET_ALL_HOSPITAL_REQUEST:
    "http://localhost:4000/request/getAllHospitalRequest",
  DONOR_AGREE_TO_DONATE: "http://localhost:4000/request/agreetodonate",
  FULFILL_REQUEST: "http://localhost:4000/request/fulfillRequest",
  GET_DONOR_DETAIL: BASE_URL + "/request/getDonorDetail",
};

