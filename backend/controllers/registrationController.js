const Event = require("../models/Event");
const Registration = require("../models/Registration");

exports.registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event || event.seatsAvailable <= 0) {
    return res.status(400).json({ message: "Event full or not found" });
  }

  const existing = await Registration.findOne({
    user: req.user._id,
    event: event._id
  });

  if (existing) {
    return res.status(400).json({ message: "Already registered" });
  }

  event.seatsAvailable -= 1;
  await event.save();

  await Registration.create({
    user: req.user._id,
    event: event._id
  });

  res.json({ message: "Registered successfully" });
};

exports.cancelRegistration = async (req, res) => {
  const registration = await Registration.findOneAndDelete({
    user: req.user._id,
    event: req.params.id
  });

  if (!registration) {
    return res.status(400).json({ message: "Not registered" });
  }

  await Event.findByIdAndUpdate(req.params.id, {
    $inc: { seatsAvailable: 1 }
  });

  res.json({ message: "Registration cancelled" });
};
