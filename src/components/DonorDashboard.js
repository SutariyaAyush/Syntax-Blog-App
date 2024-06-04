import React, { useEffect, useState } from "react";
import { getDonorDetail } from "../services/operations/authAPI";
import { useSelector } from "react-redux";
import { setUser } from "../slices/profileSlice";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const DonorDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const [donor, setDonor] = useState();
  // console.log("Printing donorId, via our state: ", user._id);

  async function fetchDonorDetail() {
    const donor = await getDonorDetail({ donorId: user._id });
    // console.log("Printing donor response: ", donor.data.data);

    setDonor(donor.data.data);
    setUser(donor);
  }

  useEffect(() => {
    fetchDonorDetail();
  }, []);
  return (
    <div>
      <h1>DonorDashboard</h1>
      <div className="flex flex-wrap m-1 justify-center">
        {donor &&
          donor.bloodDonationHistory.map((blood, index) => {
            return (
              <div key={index} className="m-4">
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
                    Blood Donated
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Donated Blood Details</Card.Title>
                    <Card.Text>
                      Take a look at all the details of blood donation
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <span className="font-medium">Hospital Name:</span>{" "}
                      {blood.Hospital_id.hospitalName}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="font-medium">Blood Group:</span>{" "}
                      {blood.bloodGroup}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="font-medium">Hospital Email:</span>{" "}
                      {blood.Hospital_id.email}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <span className="font-medium">Hospital Address:</span>{" "}
                      {blood.Hospital_id.address}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DonorDashboard;
