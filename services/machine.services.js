class MachineServices{
    static async getMachines(req){
        const db = req.conn;
        const rows = await new Promise((resolve) => {
            db.query(
              `SELECT * FROM machine`,
              (err, res) => {
                resolve(res);
                if (err) console.log(err); return {status:false,message:err};
              }
            );
        })
        let data = Object.values(JSON.parse(JSON.stringify(rows)));
        return {data,status:true};
    }

    static async createMachine(req){
        const db = req.conn;
        const { name } = req.body;
        var insertId = 0;
        const rows = await new Promise((resolve) => {
            db.query(
              `INSERT INTO machine (name) VALUES ('${name}')`,
                (err, res) => {
                    resolve(res);
                    insertId = res.insertId;
                    if (err) console.log(err);return {status:false,message:err};
                }
            )
        })
        return { status:true,message: "Machine added successfully",machine:{id:insertId,name} };
    }
}

module.exports = MachineServices;