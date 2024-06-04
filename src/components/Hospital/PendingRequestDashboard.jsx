import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmationModal } from "../../slices/confirmationSlice";
import { fulfillRequest } from "../../services/operations/authAPI";
import { updateRequestStatus } from "../../slices/requestsSlice";

const PendingRequestDashboard = ({ allReq }) => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const [showFoundRequests, setShowFoundRequests] = useState(true);

  async function fulfill(reqData) {
    try {
      const response = await fulfillRequest(reqData);
      console.log("Printing response after fulfilling request: ", response);
      dispatch(updateRequestStatus(response.data.data));
      dispatch(setConfirmationModal(null));
    } catch (err) {
      console.log(
        "Error, while calling method of auth API from pending request page: " +
          err.message
      );
    }
  }

  const filteredRequests = showFoundRequests
    ? requests.filter((req) => req.D_id !== null && req.status !== "fulfill")
    : requests.filter((req) => req.D_id === null);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4 gap-12">
        <button
          className={`mr-2 px-4 py-2 rounded border shadow-md hover:shadow-red-200 ${
            showFoundRequests ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => setShowFoundRequests(true)}
        >
          Donor Found
        </button>
        <button
          className={`px-4 py-2 rounded border  shadow-md hover:shadow-red-200 ${
            !showFoundRequests ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => setShowFoundRequests(false)}
        >
          Donor Not Found
        </button>
      </div>
      <div className="h-[46.2vh] overflow-y-scroll">
      {filteredRequests.map((req, index) => (
        <div key={index} className="border p-4 rounded mb-4 bg-white">
          {req.D_id !== null ? (
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-2 md:mb-0">
                <p className="text-lg font-semibold">
                  Requested Blood Group: {req.bloodGroup}
                </p>
                <p>Donor of this request: {req.D_id.donorName}</p>
              </div>
              <button
                onClick={() => {
                  const reqData = {
                    reqId: req._id,
                    donorId: req.D_id._id,
                  };
                  dispatch(
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "That you received the blood You requested.",
                      btn1Text: "Sure",
                      btn2Text: "Not Sure",
                      btn1Handler: () => fulfill(reqData),
                      btn2Handler: () =>
                        dispatch(setConfirmationModal(null)),
                    })
                  );
                }}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
              >
                Blood received
              </button>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold" key={index}>
                Donor yet to be found: {req.bloodGroup}
              </p>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default PendingRequestDashboard;
