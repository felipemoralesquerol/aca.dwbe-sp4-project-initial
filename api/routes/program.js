const express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.send({ programa: "Resto v2.0.0" });
});

module.exports = router;
