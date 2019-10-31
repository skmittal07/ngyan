
const mongoose=require("mongoose");
const express=require('express');
const dotenv=require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());

const ngyanUrl="mongodb+srv://ngyanDB:gyan123@ngyan-qjtej.mongodb.net/ngyan?retryWrites=true&w=majority";

//const DATABASE_NAME="ngyan";

const connectionDB= async ()=>{
await mongoose.connect(ngyanUrl,{
    useUnifiedTopology: true,
    useNewUrlParser:true});
console.log("DB Connected..!");
};



/*const uri = "mongodb+srv://ngyanDB:gyan123@ngyan-qjtej.mongodb.net/test?retryWrites=true&w=majority";
const connectionDB = new MongoClient(uri, { useNewUrlParser: true });
connectionDB.connect(err => {
  const collection = connectionDB.db("ngyan").collection("model.news");
  // perform actions on the collection object
  connectionDB.close();
});*/


module.exports =connectionDB;