require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

//app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));


app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/register", require("./routes/registrationRoutes"));
app.use("/api/users", require("./routes/userRoutes"));



app.get("/", (req, res) => {
  res.send("Event Platform API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
