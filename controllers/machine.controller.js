const Machine = require("../services/machine.services")

class MachineController{

    static async getMachines(req,res){
        try{
            const data = await Machine.getMachines(req);
            res.status(200).json(data);
        }catch(err){
            res.status(500).json({
                status:false,
                err
            });
        }
    }

    static async createMachine(req,res){
        try{
            const data = await Machine.createMachine(req);
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

module.exports = MachineController