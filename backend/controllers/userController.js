const Registration = require("../models/Registration");
const Event = require("../models/Event"); // make sure this import exists

exports.getUserEvents = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate("event")
      .sort({ "event.dateTime": 1 });

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
