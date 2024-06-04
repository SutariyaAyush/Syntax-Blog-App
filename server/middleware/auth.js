const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth

exports.auth = async (req, res, next) => {
  console.log("reached in auth middleware for adding request for hospital");
  try {
    //extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      JSON.parse(localStorage.getItem("token")) ||
      null;

      console.log("Printing token value in auth middleware:", token);
    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    console.log("auth middleware working till here");


    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Printing decoded token", JSON.stringify(decode));
      req.user = decode;
    } catch (err) {
      //verification - issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isDonor
exports.isDonor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "donor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Donor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isHospital
exports.isHospital = async (req, res, next) => {
  try {
    console.log("Printing user's accountType: ", req.user.accountType);
    if (req.user.accountType !== "hospital") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Hospital only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
