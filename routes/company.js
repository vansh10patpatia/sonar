const router = require("express").Router();
const Company = require("../controllers/company.controller");
const middlewareAuth = require("../middleware/auth");

router.get("/", middlewareAuth, Company.getAllCompanies);
router.post("/", middlewareAuth, Company.createCompany)
router.delete("/:id", middlewareAuth, Company.deleteCompany)
router.put("/:id", middlewareAuth, Company.updateCompany)

module.exports = router;
