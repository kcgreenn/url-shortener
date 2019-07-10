const express = require("express");
const Url = require("../models/Url");

const router = express.Router();

// @route   GET /:code
// @desc    Redirect to long/original url
router.get("/:code", async (req, res) => {
  try {
    // Try to find url in db
    const url = await Url.findOne({
      urlCode: req.params.code
    });
    if (url) {
      // if url is found, redirect client to that url
      return res.redirect(url.longUrl);
    } else {
      // if no matching url is found, send 404
      return res.status(404).json("No matching url found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
