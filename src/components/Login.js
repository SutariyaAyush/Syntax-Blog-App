import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import hospitalImage from "../assets/hospital.png";
import donorImage from "../assets/dlogin1.png"; // Replace with the actual donor image
import { useLoginConnector } from "../services/operations/authAPI"; // Import the useLoginConnector hook
import toast from "react-hot-toast";


const Login = () => {
  const [userType, setUserType] = useState("hospital");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const navigate = useNavigate();

  const loginConnector = useLoginConnector();

  async function loginFormHandler(e) {
    e.preventDefault();
    setFormData({});
    const updatedFormData = {
      ...formData,
      accountType: userType,
    };
    // console.log(updatedFormData);
    try {
      const response = await loginConnector(updatedFormData);
      const success = response.data.success;
      console.log("Successful login: ",success);
      if (success) {
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(
        "Error generated while submitting login formData to server :",
        error.response
      );
    }

  }

  return (
    <div
      className={`flex justify-center h-[551px] items-center ${
        userType === "hospital" ? "bg-perfect" : "bg-rose-100"
      }`}
    >
      <div className="w-[1000px] flex items-center justify-between rounded-3xl">
        <div className="justify-center items-center flex">
          <img
            className="w-[350px] h-[300px]"
            src={userType === "hospital" ? hospitalImage : donorImage}
            alt=""
          />
        </div>

        <form
          method="post"
          className={`w-[350px] h-[460px] border-solid border-2 border-black rounded-3xl flex flex-col gap-4 text-justify ${
            userType === "hospital" ? "bg-orange-600" : "bg-sky-950"
          }`}
          onSubmit={loginFormHandler}
        >
          <div
            className={`text-center ${
              userType === "hospital" ? "text-black" : "text-white"
            } text-3xl mt-3`}
          >
            <h3>Log In</h3>
          </div>
          <div className="flex flex-col gap-4 ml-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <label
                className={`${
                  userType === "hospital"
                    ? "text-lg text-black"
                    : "text-lg text-white"
                }`}
              >
                Login As:
              </label>
              <div className="flex gap-4 justify-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="user"
                    value="hospital"
                    checked={userType === "hospital"}
                    onChange={handleUserTypeChange}
                    className="mr-2"
                  />
                  <span
                    className={`${
                      userType === "hospital" ? "text-black" : "text-white"
                    }`}
                  >
                    Hospital
                  </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="user"
                    value="donor"
                    checked={userType === "donor"}
                    onChange={handleUserTypeChange}
                    className="mr-2"
                  />
                  <span
                    className={`${
                      userType === "hospital" ? "text-black" : "text-white"
                    }`}
                  >
                    Donor
                  </span>
                </label>
              </div>
            </div>

            {userType === "hospital" ? (
              <>
                <div className="flex flex-col gap-1 mt-2">
                  <label
                    className={`${
                      userType === "hospital" ? "text-black" : "text-white"
                    }`}
                  >
                    Email Id:
                  </label>
                  <input
                    name="email"
                    type="text"
                    autoFocus
                    className={`${
                      userType === "hospital" ? "text-black" : "text-black"
                    } input-field px-2 py-1 rounded-tl-lg rounded-br-xl w-[300px]`}
                    onChange={handleChange}
                    value={formData.email || ""}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1 mt-2">
                  <label
                    className={`${
                      userType === "hospital" ? "text-black" : "text-white"
                    }`}
                  >
                    Email Id:
                  </label>
                  <input
                    name="email"
                    type="text"
                    className={`${
                      userType === "hospital" ? "text-white" : "text-black"
                    } input-field px-2 py-1 rounded-tl-lg rounded-br-xl w-[300px]`}
                    onChange={handleChange}
                    value={formData.email || ""}
                    required
                  />
                </div>
              </>
            )}

            <div className="flex flex-col  gap-1">
              <label
                className={`${
                  userType === "hospital" ? "text-black" : "text-white"
                }`}
              >
                Password:
              </label>
              <input
                name="password"
                type="password"
                className={`${
                  userType === "hospital" ? "text-black" : "text-black"
                } input-field px-2 py-1 rounded-tl-lg rounded-br-xl w-[300px]`}
                onChange={handleChange}
                value={formData.password || ""}
                required
              />
            </div>

            <div className="flex">
              <button
                className={`w-[100px] h-[30px] text-white rounded-md shadow-2xl m-auto ${
                  userType === "hospital"
                    ? "bg-gradient-to-r from-sky-600 to-blue-900"
                    : "bg-gradient-to-r from-green-400 to-green-600"
                }`}
              >
                Log In
              </button>
            </div>
            <hr
              className={`${
                userType === "hospital" ? "text-black" : "text-white"
              } w-[300px]`}
            ></hr>
            <div
              className={`${
                userType === "hospital" ? "text-black" : "text-white"
              } flex mb-2 gap-2 justify-center`}
            >
              Don't have an account?{" "}
              <NavLink
                className="nav-link text-blue-500"
                id="SignUp"
                aria-current="page"
                to="/SignUp"
              >
                <span
                  className={`${
                    userType === "hospital" ? "text-blue-900" : "text-green-500"
                  } hover:underline font-bold`}
                >
                  Sign Up
                </span>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
