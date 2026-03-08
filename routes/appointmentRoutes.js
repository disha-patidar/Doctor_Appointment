const express = require("express");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { patientName, doctor, date, timeSlot } = req.body;

  const existingAppointment = await Appointment.findOne({
    doctor,
    date,
    timeSlot,
  });

  if (existingAppointment) {
    return res.status(400).json({
      message: "Doctor already booked for this time slot",
    });
  }

  const appointment = new Appointment({
    patientName,
    doctor,
    date,
    timeSlot,
  });

  await appointment.save();

  res.json(appointment);
});

router.get("/", auth, async (req, res) => {
  const appointments = await Appointment.find().populate("doctor");

  res.json(appointments);
});

module.exports = router;
