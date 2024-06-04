// Donor Controller for specific login and signup
const bcrypt = require("bcrypt");
const OTP = require("../models/OTP");
const Donor = require("../models/Donor");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
require("dotenv").config();
const Request = require("../models/Request");

exports.donorSignup = async (req, res) => {
  try {
    // Destructure fields from the request body
    // console.log("reached on donor controller now on Signup function");
    let {
      donorName,
      email,
      bloodGroup,
      password,
      cnfPassword,
      accountType,
      gender,
      dateOfBirth,
      pincode,
      address,
    } = req.body;
    // console.log("Here is all the data received from body of request");
    // console.log(donorName, email, bloodGroup, password, cnfPassword, accountType, gender, dateOfBirth, pincode, address);

    // Check if All Details are there or not
    if (
      !donorName ||
      !email ||
      !bloodGroup ||
      !password ||
      !cnfPassword ||
      !accountType ||
      !gender ||
      !dateOfBirth ||
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
    const existingUser = await Donor.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Donor already exists. Please sign in to continue.",
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

    const donor = await Donor.create({
      donorName,
      email,
      password: hashedPassword,
      bloodGroup,
      accountType,
      gender,
      dateOfBirth,
      pincode,
      address,
    });

    return res.status(200).json({
      success: true,
      donor,
      message: "Donor registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Donor cannot be registered. Please try again.",
    });
  }
};

exports.donorLogin = async (req, res) => {
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
    const user = await Donor.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `Donor is not Registered with Us Please SignUp to Continue`,
      });
    }

    // First Compare Password and then Generate JWT token and
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `Donor Login Success`,
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

// agreeToDonate controller
exports.agreeToDonate = async (req, res) => {
  const { reqId, donorId } = req.body;
  // console.log("Printing id of request in aggreeToDonate controller: ", reqId);
  // console.log("Printing donorId of request in aggreeToDonate controller: ", donorId);
  try {
    // Find the request by ID
    const request = await Request.findById(reqId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // Update the request with the donor's ID
    request.D_id = donorId;
    request.status = "temporayFulfilled";
    await request.save();

    // Notify other donors about the update (if needed)

    // Return a success message
    res.status(200).json({
      success: true,
      data: request,
      message: "Donor agreed to donate successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to process the donation agreement",
      error: error.message,
    });
  }
};

exports.getDonorDetail = async (req, res) => {
  try {
    const { donorId } = req.body;
    console.log("Priting donor id in getDonorDetail controller: ", donorId);
    
    const donor = await Donor.findById(donorId).populate(
      "bloodDonationHistory.Hospital_id"
    );


    res.status(200).json({
      success: true,
      message: "Donor details fetched successfully",
      data: donor,
    });
  } catch (error) {
    console.log(
      "Error, while fetching donor details in donor controller: ",
      error
    );
    res.status(500).json({
      success: false,
      message: "Error, while fetching donor object from db",
    });
  }
};
