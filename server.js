const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const session = require('express-session');
//Import routes
const fare = require('./routes/fare-routes');
const tiket = require('./routes/ticket-routes');
const vehicle = require('./routes/vehicle-routes');
const employee = require('./routes/employee-routes');
const customer = require('./routes/customer-routes');
const login = require('./routes/user-auth')
const { jwtValidate } = require("./middlewares/jwt-validator");

// Import connection to Data Base
const DBConnection = require('./config/DB_connection');

// Initialize imports
const app = express();
DBConnection();


//Use session to save login data
app.use(session({
  secret:'API AutosColombiaBackend',
  resave: true,
  saveUninitialized: true

}))

// Middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended : false }))

// Sett 
app.get('/', function(req, res){
    res.send("API Working Success full!!")
})


// Use routes
// fare routes
app.use('/api',[ jwtValidate ], fare);
// Ticket routes
app.use('/api', [ jwtValidate ], tiket);
// Vehicle routes
app.use('/api', vehicle);
// Employee routes
app.use('/api', employee);
// Customer routes
app.use('/api', [ jwtValidate ], customer);
// Login employee routes
app.use('/api', login);

// setup application
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Application stated in port: ', PORT);
})