const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const nodemon = require("nodemon");
const app = express();
require("dotenv").config();
const path = require("path");
const fileupload = require("express-fileupload");


const PORT = process.env.PORT ;


app.use(bodyParser.json());

const URL = process.env.MONGODB_URL ;

mongoose.connect(URL, {
     useCreateIndex: true,
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDb connection success!");
})
// Middleware
app.use(express.json());
app.use(fileupload());
app.use(cors());

// Import routes
const EmployeeManagement = require("./routes/employee_management");
const UserManagement = require("./routes/user_manegement");

const LoginManagement = require("./routes/user_login");

// Use routes
app.use("/api", EmployeeManagement);
app.use("/api", UserManagement);
app.use("/api",LoginManagement)

app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(PORT, () =>{
    console.log(`Server is up and running in port no : `+PORT);
});
