import React from "react";
import { useForm } from "react-hook-form";
import { createRequest } from "../services/operations/authAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import authSlice from '../slices/authSlice';
import {toast} from "react-hot-toast";
import { setUser } from "../slices/profileSlice";

function Addrequest() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const requestSubmitHandler = async (requestData) => {
    const updatedRequestData = {
      ...requestData,
      token,
    };
    console.log(updatedRequestData);
    const requestResponse = await createRequest(updatedRequestData);
    console.log("Printing new request response in add request handler: ", requestResponse);
    // setUser(requestResponse.)
    if (requestResponse.data.success) {
      navigate("/HospitalDashboard");
      toast.success("Request Added Successfully");
    }
    else{
      toast.error(requestResponse.response.data.message);
    }
  };
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="relative flex m-auto justify-center items-center">
      <div className="absolute flex m-auto justify-center items-center">
        <div className="bg-yellow-400 bg-opacity-5 rounded-3xl">
          <form onSubmit={handleSubmit(requestSubmitHandler)} className="border-solid border-2 border-black rounded-3xl flex flex-col gap-4 justify-center items-center text-justify w-[400px]">
          <div className="mt-4 justify-center flex text-xl text-green-500">
              Add Request For Blood
            </div>

            <div className="flex flex-col gap-6 ">
              <div className="flex flex-col gap-1 ml-1">
                <label className="text-black">Required Blood Group:</label>
                <select
                  name="bloodGroup"
                  className="px-2 py-1 rounded-lg"
                  {...register("bloodGroup")} required
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  {/* Add other blood groups */}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="">Minimum Time Period:</label>
                <input type="Date" {...register("time")} className="input-field px-2 py-1 rounded-tl-lg rounded-br-xl" required />
              </div>
              <div className="flex gap-4 mt-2 justify-center">
                <button className="m-3 w-[70px] h-[40px] bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg hover:bg-red-500">
                  Submit
                </button>
              </div>
              </div>
          </form>
        </div>
      </div>
      <img
        className="w-screen h-[67.9vh]"
        src="../second-icons/addrequest.jpg"
        alt=""
      />
    </div>
  );
}

export default Addrequest;
