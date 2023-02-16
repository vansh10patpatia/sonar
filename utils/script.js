const mysql = require("mysql");
const SendMail = require("./mailer");

const config = {
  user: "akash",
  password: "akash#sabharwal",
  host: "database-1.cm3jfh3g6yfr.ap-south-1.rds.amazonaws.com",
  database: "akash",
  port:3306
};



const connection = mysql.createConnection(config);



const Connection =  () => {
    connection.connect(function (err) {
      if (err) {
        console.log("Error connecting to Db", err);
        return;
      }
      console.log("Connection established");
    });
};

Connection();
  
const notifyUsers = async  (result) => {
  var date = new Date();
  var dats = date.setDate(date.getDate() + 2);
  var deadline = new Date(dats);
  let mm = deadline.getMonth() + 1; // Months start at 0!
  let dd = deadline.getDate();
  const yyyy = deadline.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
    return new Promise(async (resolve) => {
      let singleMail = ``;
        for(let i=0;i<result.length;i++){
            let client = result[i];
            await SendMail({
                to: client.email,
                subject: 'PM Due',
                text: 'Hi '+client.owner+',\n\nYour PM is due for '+client.company+' '+client.machine+' '+client.model_no+'. We are informing you 2 days earlier kindly keep the machine vaccant on '+ dd + '/' + mm + '/' + yyyy + ' \n\nRegards,\nAkash'
            })
            singleMail += `Hi ${client.owner},\n\nYour PM is due for ${client.company} ${client.machine} ${client.model_no}. We are informing you 2 days earlier kindly keep the machine vaccant on ${dd}/${mm}/${yyyy} \n\nRegards,\nAkash\n\n\n`;
        }
        await SendMail({
            to: 'akash19772000@yahoo.co.in',
            subject: 'PM Due for clients',
            text: singleMail
        })
        resolve();
    })
}

const getClientsDue = async () => {
    const db = connection;
	await sendEmail({
		to:'vansh10patpatia@gmail.com',
		subject:'Hi ',
		text:'Daily Check',
	})
    const rows = await new Promise((resolve) => {
        db.query(
          `SELECT C.name as company,C.owner,C.email,M.name as machine,Mo.model_no,P.manufacture_date,P.installation_date,P.purchase_status, DATEDIFF(now(), P.installation_date) as days from purchases P, companies C, models Mo, machine M where P.company = C.id and P.machine = M.id and P.model_no = Mo.id and MOD(DATEDIFF(now(), P.installation_date),120) = 0  and DATEDIFF(now(), P.installation_date) <= 366`,
          (err, res) => {
            resolve(res);
            if (err) console.log(err); return {status:false,message:err};
          }
        );
    });
    let result = Object.values(JSON.parse(JSON.stringify(rows)));
    console.log(result);
    if(result.length > 0){
        await notifyUsers(result);
    }
    
    return process.exit(0);
}

getClientsDue();

