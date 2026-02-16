const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  const { page = 1, limit = 10, search, location, category } = req.query;

  const query = {};

  if (search) query.$text = { $search: search };
  if (location) query.location = location;
  if (category) query.category = category;

  const events = await Event.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ dateTime: 1 });

  res.json(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};

exports.createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};
