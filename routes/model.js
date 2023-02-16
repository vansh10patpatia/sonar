const router = require("express").Router();
const Model = require("../controllers/model.controller");
const middlewareAuth = require("../middleware/auth");

router.get("/", middlewareAuth, Model.getModels);
router.post("/", middlewareAuth, Model.createModel)

module.exports = router;
