

class PurchasesService {

    static getPurchasesCount = async (req) => {
        const db = req.conn;
        const rows = await new Promise((resolve) => {
            db.query(
              `SELECT count(*) as count from purchases`,
              (err, res) => {
                resolve(res);
                if (err) console.log(err); return {status:false,message:err};
              }
            );
          });
        let result = Object.values(JSON.parse(JSON.stringify(rows)));
        return result;
    }


    static getOffsetAndPages = async  (req) => {
        const query = req.query;
        var page = 0;
        var limit = 100;
        if(query.page){
            if(parseInt(query.page) > 0){
                page = parseInt(query.page);
            }
        }
        if(query.limit){
            if(parseInt(query.limit) > 0){
                limit = parseInt(query.limit);
            }
        }
        const count = await this.getPurchasesCount(req);
        const totalPages = Math.ceil(count[0].count / limit);
        if(page+1 > totalPages){
            page = 0;
        }
        const offset = page * limit;
        return {offset,page,limit,totalPages,count};
    }
    
    static searchPurchases = async (req,offset,page,limit,totalPages,count) => {
        const db = req.conn;
        const { search, searchBy } = req.query;
        var sql = `SELECT P.id as id ,C.name as company,C.id as companyId,C.owner,M.name as machine,M.id as machineId,M.price,Mo.model_no,Mo.id as modelId,P.manufacture_date,P.installation_date,P.purchase_status, period_diff(date_format(now(), '%Y%m'), date_format(P.installation_date, '%Y%m')) as months from purchases P, companies C, models Mo, machine M where P.company = C.id and P.machine = M.id and P.model_no = Mo.id and (C.name like '%${search}%' or M.name like '%${search}%' or Mo.model_no like '%${search}%' or P.purchase_status like '${search}') order by P.id desc`
        switch(searchBy){
            case 'manufacture_date':
                sql = `SELECT P.id as id ,C.name as company,C.id as companyId,C.owner,M.name as machine,M.id as machineId,M.price,Mo.model_no,Mo.id as modelId,P.manufacture_date,P.installation_date,P.purchase_status, period_diff(date_format(now(), '%Y%m'), date_format(P.installation_date, '%Y%m')) as months from purchases P, companies C, models Mo, machine M where P.company = C.id and P.machine = M.id and P.model_no = Mo.id and P.manufacture_date = '${search}' order by P.id desc`;
                break;
            case 'installation_date':
                sql = `SELECT P.id as id ,C.name as company,C.id as companyId,C.owner,M.name as machine,M.id as machineId,M.price,Mo.model_no,Mo.id as modelId,P.manufacture_date,P.installation_date,P.purchase_status, period_diff(date_format(now(), '%Y%m'), date_format(P.installation_date, '%Y%m')) as months from purchases P, companies C, models Mo, machine M where P.company = C.id and P.machine = M.id and P.model_no = Mo.id and P.installation_date = '${search}' order by P.id desc`;
                break;

        }
        const rows = await new Promise((resolve) => {
            db.query(
              `${sql}`,
              (err, res) => {
                resolve(res);
                if (err) console.log(err); return {status:false,message:err};
              }
            );
          });
        let res = Object.values(JSON.parse(JSON.stringify(rows)));
        const data = {purchases:res};
        return data;
    }

    static getAllPurchases = async (req) => {
        const { offset,page,limit,totalPages,count } = await this.getOffsetAndPages(req);
        console.log(req.query)
        if(req.query.search!='false' && req.query.searchBy!='false'){
            return await this.searchPurchases(req,offset,page,limit,totalPages,count);
        }
        const db = req.conn;
        const rows = await new Promise((resolve) => {
            db.query(
              `SELECT P.id as id ,C.name as company,C.id as companyId,C.owner,M.name as machine,M.id as machineId,M.price,Mo.model_no,Mo.id as modelId,P.manufacture_date,P.installation_date,P.purchase_status, period_diff(date_format(now(), '%Y%m'), date_format(P.installation_date, '%Y%m')) as months from purchases P, companies C, models Mo, machine M where P.company = C.id and P.machine = M.id and P.model_no = Mo.id order by P.id desc limit ${limit} offset ${offset} `,
              (err, res) => {
                resolve(res);
                if (err) console.log(err); return {status:false,message:err};
              }
            );
          });
        let result = Object.values(JSON.parse(JSON.stringify(rows)));
        const data = {purchases:result,page,limit,totalPages,records : count[0].count};
        return data;
    }

    static createPurchase = async (req) => {
        const db = req.conn;
        const { company, machine,model_no,manufacture_date,installation_date,purchase_status } = req.body;
        const rows = await new Promise((resolve) => {
            db.query(
              `INSERT INTO purchases (company,machine,model_no,manufacture_date,installation_date,purchase_status) VALUES ('${company}','${machine}','${model_no}','${manufacture_date}','${installation_date}','${purchase_status}')`,
                (err, res) => {
                    resolve(res);
                    if (err) console.log(err);return {status:false,message:err};
                }
            )
        });
        let result = Object.values(JSON.parse(JSON.stringify(rows)));
        return { status:true,message: "Purchase created successfully" };

    }

    static buildPatchQuery = (table, id, data) => {
        if (Object.keys(data).length === 0) return null; // Or return what you want
        let sql = `UPDATE ${table} SET`;
        Object.entries(data).forEach(([key, value]) => {
            const valueToSet = typeof data[key] === 'string' ? `'${value}'` : value;
            sql += ` ${key}=${valueToSet},`;
        });
        sql = sql.slice(0, -1); // Remove last ","
        sql += ` WHERE id=${id};`;
        return sql;
    }

    static updatePurchase = async (req) => {
        const db = req.conn;
        const { id } = req.params;
        const { company, machine,model_no,manufacture_date,installation_date,purchase_status } = req.body;
        const sql = this.buildPatchQuery('purchases', id, req.body);
        const rows = await new Promise((resolve) => {
            db.query(sql,
                (err, res) => {
                    resolve(res);
                    if (err) console.log(err);return {status:false,message:err};
                }
            )
        });
        let result = Object.values(JSON.parse(JSON.stringify(rows)));
        return { status:true,message: "Purchase updated successfully" };
    }

    static deletePurchase = async (req) => {
        const db = req.conn;
        const { id } = req.params;
        await new Promise((resolve) => {
            db.query(
              `DELETE FROM purchases WHERE id = '${id}'`,   
                (err, res) => {
                    resolve(res);
                    if (err) console.log(err);return err;
                }
            )
        });
        return { status:true,message: "Purchase deleted successfully" };
    }
}

module.exports = PurchasesService;