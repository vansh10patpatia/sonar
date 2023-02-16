const router = require("express").Router();
const Machines = require("../controllers/machine.controller");
const middlewareAuth = require("../middleware/auth");

router.get("/", middlewareAuth, Machines.getMachines);
router.post("/", middlewareAuth, Machines.createMachine)

module.exports = router;
