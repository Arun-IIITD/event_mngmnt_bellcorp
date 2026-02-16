const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    organizer: { type: String, required: true },
    location: { type: String, required: true },
    dateTime: { type: Date, required: true },
    description: String,
    // capacity: { type: Number, required: true },
    seatsAvailable: { type: Number, required: true },
    category: [String],
     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Text index for search
eventSchema.index({
  name: "text",
  description: "text",
  location: "text",
  category: "text"
});

module.exports = mongoose.model("Event", eventSchema);
