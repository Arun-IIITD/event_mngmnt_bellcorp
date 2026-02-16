const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getUserEvents } = require("../controllers/userController");

router.get("/me/events", protect, getUserEvents);

module.exports = router;
