require("dotenv").config();
const Purchases = require("../services/purchases.services");

class PurchasesController {

    static getAllPurchases = async (req, res, next) => {
        try {
            const data = await Purchases.getAllPurchases(req);
            res.status(200).json({
                status: "success",
                data: data
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static createPurchase = async (req, res, next) => {
        try {
            const data = await Purchases.createPurchase(req);
            res.status(200).json({
                status: data.status,
                data: data.message
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static updatePurchase = async (req, res, next) => {
        try {
            const data = await Purchases.updatePurchase(req);
            res.status(200).json({
                status: data.status,
                message: data.message
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }


    static deletePurchase = async (req, res, next) => {
        try {
            const data = await Purchases.deletePurchase(req);
            res.status(200).json({
                status: data.status,
                message: data.message
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}


module.exports = PurchasesController;
