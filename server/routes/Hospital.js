const express = require("express");
const router = express.Router();
const { auth, isHospital, isDonor } = require("../middleware/auth");
const getAllPendingRequest = require("../controllers/getAllPendingRequest");
const getAllHospitalRequest = require("../controllers/getAllHospitalRequest");
const { fulfillRequest } = require("../controllers/Hospital");

const { createRequest } = require("../controllers/Hospital");
const { agreeToDonate } = require("../controllers/Donor");

router.post("/createRequest", auth, isHospital, createRequest);
router.get("/getAllPendingRequest", getAllPendingRequest);
router.post("/getAllHospitalRequest", getAllHospitalRequest);
router.post("/agreetodonate", agreeToDonate);
router.post("/fulfillRequest", fulfillRequest);

module.exports = router;
