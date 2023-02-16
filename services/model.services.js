class ModelServices{
    static async getModels(req){
        const db = req.conn;
        const rows = await new Promise((resolve) => {
            db.query(
              `SELECT * FROM models`,
              (err, res) => {
                resolve(res);
                if (err) console.log(err); return {status:false,message:err};
              }
            );
        })
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        return {data,status:true};
    }

    static async createModel(req){
        const db = req.conn;
        const { model_no } = req.body;
        var insertId = 0;
        const rows = await new Promise((resolve) => {
            db.query(
              `INSERT INTO models (model_no) VALUES ('${model_no}')`,
                (err, res) => {
                    resolve(res);
                    insertId = res.insertId;
                    if (err) console.log(err);return {status:false,message:err};
                }
            )
        })
        return { status:true,message: "Model added successfully",model:{id:insertId,model_no} };
    }
}

module.exports = ModelServices;