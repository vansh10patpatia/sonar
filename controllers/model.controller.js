const Model = require("../services/model.services")

class ModelController{

    static async getModels(req,res){
        try{
            const data = await Model.getModels(req);
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                status:false,
                err
            });
        }
    }

    static async createModel(req,res){
        try{
            const data = await Model.createModel(req);
            res.status(200).json(data);
        }
        catch(err){
            res.status(500).json({
                status:false,
                err
            });
        }
    }
}

module.exports = ModelController