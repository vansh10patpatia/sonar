const router = require("express").Router();
const Purchases = require("../controllers/purchases.controller");
const middlewareAuth = require("../middleware/auth");

router.get("/", middlewareAuth, Purchases.getAllPurchases);
router.post("/", middlewareAuth, Purchases.createPurchase)
router.delete("/:id", middlewareAuth, Purchases.deletePurchase)
router.put("/:id", middlewareAuth, Purchases.updatePurchase)

module.exports = router;
