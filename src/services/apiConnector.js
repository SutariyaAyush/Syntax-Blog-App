import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  console.log("Here is all the final data before sending it to server: ", bodyData);
  console.log("URL: ", url);
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  })
    .then((response) => {
      console.log("API Response:", response);
      return response;
    })
    .catch((error) => {
      console.error("API Error:", error);
      throw error; // Rethrow the error to propagate it to the calling function
    });
};
