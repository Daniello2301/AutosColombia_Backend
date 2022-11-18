const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');

//Import routes
const fare = require('./routes/fare-routes');
<<<<<<< HEAD
const tiket = require('./routes/tiket-routes');
const vehicle = require('./routes/vechicle-routes');
const employee = require('./routes/employee-routes')

=======
const tiket = require('./routes/tiket-routes')
const vehicle = require('./routes/vechicle-routes')
const customer = require('./routes/customer-routes')
>>>>>>> 12bb893616f6f638a06043f1b60b6bffecf12906

// Import connection to Data Base
const DBConnection = require('./config/DB_connection');

// Initialice imports
const app = express();
DBConnection();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended : false }))

// Sett 
app.get('/', function(req, res){
    res.send("API Working Succesfull!!")
})


// Use routes
// fare routes
app.use('/api', fare);
// Tiket routes
app.use('/api', tiket);
// Vehicle routes
app.use('/api', vehicle);
<<<<<<< HEAD
// Employee routes
app.use('/api',employee);
=======
// customer routes
app.use('/api', customer);
>>>>>>> 12bb893616f6f638a06043f1b60b6bffecf12906

// setup application
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log('Application stated in port: ', PORT);
})