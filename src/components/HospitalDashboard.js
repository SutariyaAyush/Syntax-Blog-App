import React, { useEffect, useState } from "react";
import PendingRequestDashboard from "./Hospital/PendingRequestDashboard";
import FulFilledRequestDashboard from "./Hospital/FulFilledDashboard";
import ConfirmationModal from "./ConfirmationModal";
import { getAllHospitalRequests } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { initializeRequests } from "../slices/requestsSlice";

const HospitalDashboard = () => {
  const { user } = useSelector((state) => state.profile) || localStorage.getItem("user");
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState(null);
  const { confirmationModal } = useSelector((state) => state.confirmation);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("pending");

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        const hospitalData = await getAllHospitalRequests({ userId: user._id });
        setHospital(hospitalData);
        dispatch(initializeRequests(hospitalData.data.requested));
      } catch (error) {
        console.log("Error while fetching hospital information: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchHospital();
  }, [dispatch, user._id]);

  return (
    <div className="flex bg-rose-400 bg-opacity-10">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <React.Fragment>
          {!hospital && (
            <p>Here we are going to show all the request made by hospital</p>
          )}
          {hospital && (
            <React.Fragment>
              <div className="w-1/4 p-4 flex flex-col h-[67.8vh]">
                <h2>Hospital Dashboard</h2>
                <div className="my-4">
                  <div className="flex flex-col justify-between align-center my-5 ">
                    <button
                      className={`p-[1vh] m-[3vh] border rounded border-black shadow-md hover:shadow-red-200 ${selectedTab === "pending" ? "bg-red-500 text-white" : ""
                        }`}
                      onClick={() => setSelectedTab("pending")}
                    >
                      Pending Request
                    </button>
                    <button
                      className={`p-[1vh] m-[3vh] border rounded my-5 border-black shadow-md hover:shadow-red-200 ${selectedTab === "fulfilled" ? "bg-red-500 text-white" : ""
                        }`}
                      onClick={() => setSelectedTab("fulfilled")}
                    >
                      Fulfilled Request
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-3/4 p-4">
                {selectedTab === "pending" ? (
                  <PendingRequestDashboard />
                ) : (
                  <FulFilledRequestDashboard />
                )}
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default HospitalDashboard;
