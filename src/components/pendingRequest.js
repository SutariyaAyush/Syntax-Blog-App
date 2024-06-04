import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { DonorAgreeToDonate } from "../services/operations/authAPI";
import ConfirmationModal from "./ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmationModal } from "../slices/confirmationSlice";

const PendingRequest = () => {
  const [allReq, setallReq] = useState([]);
  const { confirmationModal } = useSelector((state) => state.confirmation);
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:4000/request/getAllPendingRequest"
      );
      const data = await response.json();
      setallReq(data.requests);
    } catch (error) {
      console.log(
        "Error occurred while fetching requests from the database in PendingRequest.js file",
        error
      );
    }
  }

  const agreeToDonateHandler = async (reqId) => {
    // console.log("Printing request id in agreeToDonateHandler: " + reqId);
    await DonorAgreeToDonate(reqId);
    await fetchData(); // Fetch updated requests
    dispatch(setConfirmationModal(null));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-wrap justify-center h-[67.9vh]">
      {allReq.length === 0 ||
      allReq.filter((req) => req.status === "pending").filter((req) => req.bloodGroup === user.bloodGroup).length === 0 ? (
        <p>There are no pending requests at this time.</p>
      ) : (
        allReq
          .filter((req) => req.status === "pending")
          .filter((req) => req.bloodGroup === user.bloodGroup)
          .map((req) => {
            return (
              <div key={req._id} className="m-4">
                <Card
                  border="secondary"
                  style={{
                    width: "18rem",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Card.Header
                    style={{ backgroundColor: "#b91c1c", color: "white" }}
                  >
                    Request
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Found a Match</Card.Title>
                    <Card.Text>
                      Hey,We need you! Please Reach out to us ASAP
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <span className="font-medium">Hospital Name:</span>{" "}
                      {req.Hospital_id.hospitalName}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="font-medium">Blood Group:</span>{" "}
                      {req.bloodGroup}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="font-medium">Action:</span>
                      <Button
                        variant="primary"
                        onClick={() => {
                          const reqId = req._id;
                          const donorId = user._id;
                          const requestData = {
                            reqId,
                            donorId,
                          };
                          dispatch(
                            setConfirmationModal({
                              text1: "Are you sure?",
                              text2:
                                "That you will donate your blood for this request.",
                              btn1Text: "Sure",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                agreeToDonateHandler(requestData),
                              btn2Handler: () =>
                                dispatch(setConfirmationModal(null)),
                            })
                          );
                        }}
                      >
                        Want to Donate
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            );
          })
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default PendingRequest;
