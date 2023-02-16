class CompanyService {
    static getAllCompanies = async (req) => {
        const db = req.conn;
        const rows = await new Promise((resolve) => {
            db.query(
              `SELECT * FROM companies`,
              (err, res) => {
                resolve(res);
                if (err) console.log(err); return {status:false,message:err};
              }
            );
          });
        let result = Object.values(JSON.parse(JSON.stringify(rows)));
        return result;
    }

    static createCompany = async (req) => {
        const db = req.conn;
        const { name,email,owner } = req.body;
        const rows = await new Promise((resolve) => {
            db.query(
              `INSERT INTO companies (name,email,owner) VALUES ('${name}','${email}','${owner}')`,
                (err, res) => {
                    resolve(res);
                    if (err) console.log(err);return {status:false,message:err};
                }
            )
        });
        let result = Object.values(JSON.parse(JSON.stringify(rows)));
        return { status:true,message: "Company added successfully" };

    }

    static updateCompany = async (req) => {
        const db = req.conn;
        const { id } = req.params;
        const { name,email,owner } = req.body;
        const rows = await new Promise((resolve) => {
            db.query(
              `UPDATE companies SET name='${name}',email='${email}',owner='${owner}' WHERE id = '${id}'`,
                (err, res) => {
                    resolve(res);
                    if (err) console.log(err);return {status:false,message:err};
                }
            )
        });
        let result = Object.values(JSON.parse(JSON.stringify(rows)));
        return { status:true,message: "Company updated successfully" };
    }

    static deleteCompany = async (req) => {
        const db = req.conn;
        const { id } = req.params;
        await new Promise((resolve) => {
            db.query(
              `DELETE FROM companies WHERE id = '${id}'`,   
                (err, res) => {
                    resolve(res);
                    if (err) console.log(err);return err;
                }
            )
        });
        return { status:true,message: "Company deleted successfully" };
    }
}

module.exports = CompanyService;