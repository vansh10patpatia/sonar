const Company = require('../services/company.services');

class CompanyController {
    
        static getAllCompanies = async (req, res, next) => {
            try {
                const data = await Company.getAllCompanies(req);
                res.status(200).json({
                    status: "success",
                    data: data
                });
            } catch (err) {
                console.log(err);
                next(err);
            }
        }
    
        static createCompany = async (req, res, next) => {
            try {
                const data = await Company.createCompany(req);
                res.status(200).json({
                    status: data.status,
                    data: data.message
                });
            } catch (err) {
                console.log(err);
                next(err);
            }
        }
    
        static updateCompany = async (req, res, next) => {
            try {
                const data = await Company.updateCompany(req);
                res.status(200).json({
                    status: data.status,
                    message: data.message
                });
            } catch (err) {
                console.log(err);
                next(err);
            }
        }

        static deleteCompany = async (req, res, next) => {
            try {
                const data = await Company.deleteCompany(req);
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

module.exports = CompanyController;