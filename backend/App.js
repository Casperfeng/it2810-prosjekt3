const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const dontenv = require('dotenv');
dontenv.config();

const express = require('express');
const path = require('path');


const app = express();

const port = process.env.PORT || 5000;
  
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

//henter data fra .env fil, må konfigureres på egen maskin
const pool = mysql.createPool({
    connectionLimit: process.env.PORT,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
  });
   
app.listen(port, () => console.log(`Listening on port ${port}`));
  
module.exports = app;