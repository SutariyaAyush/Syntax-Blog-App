const bcrypt = require("bcrypt");
const OTP = require("../models/OTP");
const Donor = require("../models/Donor");
const Request = require("../models/Request");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const Hospital = require("../models/Hospital");
require("dotenv").config();

exports.hospitalSignup = async (req, res) => {
  // console.log("reached in hospital controller for hospital signup");
  try {
    // Destructure fields from the request body

    let {
      hospitalId,
      hospitalName,
      email,
      password,
      cnfPassword,
      accountType,
      pincode,
      address,
    } = req.body;
    // console.log("Printing all the received in body of request:");
    // console.log(hospitalId,hospitalName,email,password,cnfPassword,accountType,pincode,address);

    // Check if All Details are there or not
    if (
      !hospitalId ||
      !hospitalName ||
      !email ||
      !password ||
      !cnfPassword ||
      !accountType ||
      !pincode ||
      !address
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if password and confirm password match
    if (password !== cnfPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    // Check if user already exists
    const existingUser = await Hospital.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Hospital already exists. Please sign in to continue.",
      });
    }

    /* // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message:
          "The OTP is not valid || NO OTP FOUND FOR THIS GIVEN EMAIL ADDRESS",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } */

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const hospital = await Hospital.create({
      hospitalId,
      hospitalName,
      email,
      password: hashedPassword,
      pincode,
      address,
      accountType: accountType,
    });

    return res.status(200).json({
      success: true,
      hospital,
      message: "Hospital registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Hospital cannot be registered. Please try again.",
    });
  }
};

exports.hospitalLogin = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password, accountType } = req.body;

    // Check if email or password is missing
    if (!email || !password || !accountType) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email
    const user = await Hospital.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `Hospital is not Registered with Us Please SignUp to Continue`,
      });
    }

    // First Compare Password and then Generate JWT token and
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      //verify the token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Printing token: ", token);
      // console.log("Printing decoded token", JSON.stringify(decode));

      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `Hospital Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

exports.createRequest = async (req, res) => {
  const Hospital_id = req.user.id;
  console.log("Printing ID Of Hospital: ", Hospital_id);

  try {
    let { bloodGroup } = req.body;

    if (!bloodGroup) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    const status = "pending";

    const newRequest = await Request.create({
      Hospital_id,
      bloodGroup,
      status,
      D_id: null, // Initialize donor ID as null
    });

    console.log("Urgent need of This blood group: ", bloodGroup);

    // Finding the hospital which made the request and updating its requested array with the new request
    const updatedHospital = await Hospital.findByIdAndUpdate(
      Hospital_id,
      {
        $push: {
          requested: newRequest.toObject(), // Push the entire request object
        },
      },
      { new: true }
    );

    // Ensure that the update was successful
    if (!updatedHospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    // Return the new request and a success message
    res.status(200).json({
      success: true,
      data: updatedHospital,
      message: "New Request Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Request for Blood",
      error: error.message,
    });
  }
};

exports.fulfillRequest = async (req, res) => {
  try {
    const { reqId, donorId } = req.body;

    /* console.log("Printing reqId in fulfillRequest controller for testing: " , reqId);
    console.log("Printing donorId in fulfillRequest controller for testing: " , donorId); */

    const request = await Request.findById(reqId);
    request.status = "fulfill"; // Update status to "fulfilled"
    await request.save();

    // Find the donor by their ID and push the request to their blood donation history
    const donor = await Donor.findById(donorId);
    donor.bloodDonationHistory.push(request);
    await donor.save();

    res.status(200).json({
      success: true,
      message:
        "Request status changed successfully to fulfilled and added to donor's blood donation history",
      data: request, // Returning the updated request object
    });
  } catch (error) {
    console.error(
      "Error while changing request status from temporary to fulfill:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to change request status to fulfilled",
      error: error.message,
    });
  }
};
