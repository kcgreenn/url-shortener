const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/Url");

// @route   POST /api/url/shorten
// @desc    Create short url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");
  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }
  //   Create URL code
  const urlCode = shortId.generate();

  // Check if long url is valid
  if (validUrl.isUri(longUrl)) {
    try {
      // if url is already in db, return it
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        //   else create new url entry, save to db and send it back to client
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });
        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
    }
  } else {
    //   if long url is not valid
    res.status(401).json("Invalid URL");
  }
});

module.exports = router;
