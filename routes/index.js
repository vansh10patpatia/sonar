const express = require("express");
const router = express.Router();

const auth = require("./auth");
const purchases = require("./purchases");
const companies = require("./company");

router.use("/auth", auth);
router.use("/purchases", purchases);
router.use("/companies", companies);
router.use("/machines",require("./machine"));
router.use("/models",require("./model"));

module.exports = router;