import React from "react";
import { useSelector } from "react-redux";

const FulFilledRequestDashboard = ({ allReq }) => {
  const { requests } = useSelector((state) => state.requests);

  return (
    <div className="p-4 h-[61.5vh] overflow-y-scroll">
      {requests.map((req, index) => {
        return (
          req.status === "fulfill" && (
            <div key={index} className="border p-4 rounded mb-4 bg-white ">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    This request is fulfilled: {req.bloodGroup}
                  </p>
                  <p>
                    Donor of this request: {req.D_id ? req.D_id.donorName : ""}
                  </p>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default FulFilledRequestDashboard;
