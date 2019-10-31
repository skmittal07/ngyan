var express = require("express");
var app = express();
//var MongoClient = require('mongodb').MongoClient;
var CtrlUser = require("../Controller/controller.users");
var CtrlNewsCategories = require("../Controller/controller.newsCategories");
var CtrlImages = require('../Controller/controller.newsImages');
var CtlNews = require('../Controller/controller.news');
var peopleNews = require('../Controller/controller.peoplenews');
//const connection=require('../routes/Connection.js');



//const ngyanUrl="mongodb+srv://ngyanDB:gyan123@ngyan-qjtej.mongodb.net/ngyan?retryWrites=truengyan&w=majority";
//var client=MongoClient.connect(ngyanUrl,{
  //useUnifiedTopology: true 
//});






var body = require("body-parser");
var cors = require('cors');



app.use(cors());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(body.json({
  limit: '50mb'
}));







app.get("/UserDetail", cors(), CtrlUser.Getuserdetail);
app.get("/UserbyId/:Id", cors(), CtrlUser.GetusrbyId);

app.post("/AddUsers", cors(), CtrlUser.Post_UsersDetail);

app.post("/UserDeActive/:Id", CtrlUser.UserDeActive);
app.put("/UpdateUser/:Id", CtrlUser.UpdateUserDetail);

app.post("/auth", CtrlUser.LoginAuth);



//News Categories...

app.post("/NewsCategories", cors(), CtrlNewsCategories.PostNewsCategories);
app.get("/NCDetail", cors(), CtrlNewsCategories.GetNewsCategories);
app.get("/NewsById/:Id", CtrlNewsCategories.GetNewsbyId);



// News Images



app.post('/AddImages', cors(), CtrlImages.imguploads);





//app.get('/GetAllNews', cors(), CtlNews.GetallNews);

app.post('/Addnews', cors(), CtlNews.Post_News);
app.get('/GetGernalCorner', CtlNews.GernalCornerNews);
app.get('/getnewsdetail', cors(), CtlNews.getNewsDetail);
app.get('/BrkNews', cors(), CtlNews.getBreakingNews);
app.get('/GetPlaces', cors(), CtlNews.getNewsPlaces);
app.get('/getnewsbyId/:id', cors(), CtlNews.GetallNewsById);
app.get('/FinCorner', cors(), CtlNews.getfinanceCorner);
app.get('/publishedNews', cors(), CtlNews.GetAllPublishedNews);
app.put('/newsUpdate',cors(),CtlNews.UpdateNews);





//People Published News

app.get('/PeopleNews', cors(), peopleNews.publishedNews);

module.exports = app;