const express = require("express");
const router = express.Router();

const { getDonorDetail } = require("../controllers/Donor");

router.post("/getDonorDetail", getDonorDetail);

module.exports = router;
