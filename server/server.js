const express = require("express");
const app = express();
//const BodyParser = require("body-parser");
var cors=require("cors");

const mongoose=require("mongoose");
//var CtrlUser=require("./Controller/controller.users");
var routeapp=require("./App/route.js");
const connection=require('./routes/Connection.js');
connection();

const port = process.env.PORT || 3000





//app.use("/api",CtrlUser.allusers);

app.use("/api",routeapp);





app.listen(port, () => console.log("You are at 3000 port" + port)); 
