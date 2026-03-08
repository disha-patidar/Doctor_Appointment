const express = require("express");
const Doctor = require("../models/Doctor");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const doctor = new Doctor(req.body);

  await doctor.save();

  res.json(doctor);
});

router.get("/", async (req, res) => {
  const doctors = await Doctor.find();

  res.json(doctors);
});

module.exports = router;
