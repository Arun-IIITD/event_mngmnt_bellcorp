const express = require("express");
const router = express.Router();
const {
  registerEvent,
  cancelRegistration
} = require("../controllers/registrationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/:id/register", protect, registerEvent);
router.delete("/:id/cancel", protect, cancelRegistration);

module.exports = router;
