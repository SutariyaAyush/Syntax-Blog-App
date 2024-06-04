const { useParams } = require("react-router-dom");
const Hospital = require("../models/Hospital");
const mongoose = require("mongoose");

const getAllHospitalRequest = async (req, res) => {
  try {
    // console.log("Printing whole request...", req);
    const { userId } = req.body;
    console.log(
      "Printing Hospital ID in getAllHospitalRequest Controller by req.body method: ",
      userId
    );

    const hospital = await Hospital.findById(userId)
      .populate({
        path: "requested",
        populate: { path: "D_id" },
      })
      .exec();


    console.log("Printing new hospital in controller:", hospital);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hospital,
      message: "All The request of the hospital is fetched successfully",
    });
  } catch (error) {
    console.error("Error getting hospital requests:", error);
    res.status(500).json({
      success: false,
      message: "Error getting hospital requests",
      error: error.message,
    });
  }
};

module.exports = getAllHospitalRequest;
