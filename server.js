const express = require('express')

// Import connection to Data Base
const DBConnection = require('./config/DB_connection');

// Initialice imports
const app = express();
DBConnection();



// Sett 
app.use('/', function(req, res){
    res.send("API Working Succesfull!!")
})

// setup application
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Application stated in port: ', PORT);
})