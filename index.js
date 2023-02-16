
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
// const YAML = require("yamljs");
const mysql = require("mysql");
var morgan = require('morgan')


const dotenv = require("dotenv");


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  };



const connection = mysql.createConnection(config);

dotenv.config();

const port = 8001;

const routes = require('./routes/index')

const Connection = () => {
    connection.connect(function (err) {
      if (err) {
        console.log("Error connecting to Db", err);
        return;
      }
      console.log("Connection established");
    });
  };
  
Connection();



const app = express();


const corsOptions ={
    origin:"*", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(morgan('combined'))




app.use(function (req, res, next) {
    req.conn = connection;
    next();
});
app.use('/v1', routes);


app.listen(port, () => {
	console.log(`Server up and running on port ${port}`);
});
