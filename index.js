const express = require("express");

const app = express();

// accept json data into api
app.use(express.json({ extended: false }));

const PORT = 5030;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
