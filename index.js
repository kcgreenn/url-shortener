const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect to database
connectDB();

// accept json data into api
app.use(express.json({ extended: false }));

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = 5030;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
