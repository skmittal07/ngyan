const express = require("express");
const app = express();
var cors=require("cors");
//var CtrlUser=require("./Controller/controller.users");
var routeapp=require("./App/route.js");


//app.use("/api",CtrlUser.allusers);

app.use("/api",routeapp);



app.listen(3000, () => {
    console.log("You are at 3000 port");
});