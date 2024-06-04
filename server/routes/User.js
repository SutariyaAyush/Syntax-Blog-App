const express = require("express");
const router = express.Router();

const donorController = require("../controllers/Donor");
const hospitalController = require("../controllers/Hospital");
const {sendotp} = require("../controllers/auth");

router.post("/login", (req, res) => {
  const { accountType } = req.body;

  if (accountType === "donor") {
    donorController.donorLogin(req, res);
  } else if (accountType === "hospital") {
    hospitalController.hospitalLogin(req, res);
  } else {
    res.status(400).json({ error: "Invalid account type" });
  }
});


router.post("/signup", (req, res) => {
  const { accountType } = req.body;

  if (accountType === "donor") {
    donorController.donorSignup(req, res);
  } else if (accountType === "hospital") {
    hospitalController.hospitalSignup(req, res);
  } else {
    res.status(400).json({ error: "Invalid account type" });
  }
});


router.post("/sendotp", sendotp);

module.exports = router;
