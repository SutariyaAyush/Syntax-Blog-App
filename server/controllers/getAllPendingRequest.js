// getAllPendingRequest.js

const Request = require("../models/Request");

const getAllPendingRequest = async (req, res) => {
  try {
    const requests = await Request.find().populate("Hospital_id");

    res.status(200).json({
      success: true,
      requests,
      message: "All pending requests fetched",
    });
  } catch (error) {
    console.log("Error while fetching all pending requests from database");
    return error;
  }
};

module.exports = getAllPendingRequest;
