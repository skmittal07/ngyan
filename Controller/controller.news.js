var express = require('express');
var app = express();
var body = require('body-parser');
const mongoose = require("mongoose");
const conn=require('../routes/Connection.js');

//const gyandb = require('ngyan').MongoClient;
//mongoose.connect('mongodb://localhost:27017/ngyan');
//mongoose.connect('conn');
var MongoClient = require('mongodb').MongoClient;
var newsdb = require("../Model/model.News");
var modelnewsdb = mongoose.model("model.News");
var NewsPlacedb = require("../Model/model.NewsPlace");
var newsPlacemod = mongoose.model("model.NewsPlace");
var Imagesmodel = require('../Model/model.uploadedImages');

//const ngyanUrl="mongodb+srv://ngyanDB:gyan123@ngyan-qjtej.mongodb.net/test?retryWrites=true&w=majority";
const ngyanUrl="mongodb+srv://ngyanDB:gyan123@ngyan-qjtej.mongodb.net/ngyan?retryWrites=true&w=majority";
               

var cors = require('cors');
app.use(cors());
app.use(body.json());


async function getNewsDetail(req, res) {
    //const client = await MongoClient.connect('mongodb://localhost:27017/ngyan');
    const client=await MongoClient.connect(ngyanUrl,{
        useUnifiedTopology: true 
    });
   //const Client=await mongoose.connect(ngyanUrl);
    const db = client.db('ngyan');
    try {
        const docs = await db.collection('model.news').aggregate([{

                $lookup: {
                    from: 'model.newscategories',
                    localField: 'CategoryId',
                    foreignField: '_id',
                    as: 'categorydetail'
                }
            },
            {
                $lookup: {
                    from: 'model.users',
                    localField: 'EnterdBy',
                    foreignField: '_id',
                    as: 'userinfo'
                }
            }

        ]).toArray();
        var strfy = JSON.stringify(docs);
        res.send(docs);
        
        //console.log(docs);

    } catch (error) {
        res.status(500);
    }
    // res.send(docs);

}

/*var GetallNews = async (req, res) => {
    try {
        const allnews = await modelnewsdb.find({});
        res.send(allnews);
    } catch (error) {
        res.status(500);
    }
};*/
var getNewsPlaces = async (req, res) => {
    try {
        const Places = await newsPlacemod.find({});
       // console.log(Places);
        res.send(Places);
    } catch (error) {
        res.status(500);
    }
};


var Post_News = (async (req, res) => {
    try {
        var today = new Date().toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        });
     //   console.log(today);

        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        d = h + ':' + m + ':' + ':' + s;
        // var dd=d.getDate();
        const dobnews = new modelnewsdb();
        dobnews.CategoryId = req.body.CategoryId;
        dobnews.Caption = req.body.Caption;
        dobnews.News = req.body.News;
        dobnews.NewsDate = today; //req.body.NewsDate=Date.now;
        dobnews.NewsTime = d;
        dobnews.EnterdBy = req.body.EnterdBy = "5bfeb579ab91215acc12f116";
        dobnews.NewsPlace = req.body.NewsPlace = "";
        dobnews.IsNewsPublished = req.body.IsNewsPublished = false;
        dobnews.NewsPublishedDate = req.body.NewsPublishedDate;
        dobnews.NewsUID = getrandom();
        dobnews.NewsStatus = req.body.NewsStatus = false;
        await dobnews.save();
       res.send(dobnews);
       // res.json(dobnews);
        
        console.log(dobnews);
    } catch (error) {
        res.status(500);
        console.log(error);
    }
});

/*function returnDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return today = dd + '/' + mm + '/' + yy
}*/
//function for Breaking News
var getBreakingNews = async (req, res) => {
    var today = new Date().toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
    var CurCaption = [];
    try {
        var BreakNews = await modelnewsdb.find({});
        for (var i = 0; i < BreakNews.length; i++) {
            var IstodayBrNews = BreakNews[i].NewsDate;
            var Ispublished = BreakNews[i].IsNewsPublished;
            if (IstodayBrNews === today && Ispublished !== true) {
                CurCaption.push(BreakNews[i]);
            }
        }
        res.send(CurCaption);
    } catch (error) {
        res.status(500);
    }
};
//this function will generate 6 digit random number as NEWSUID
var getrandom = function () {
    return Math.floor(100000 + Math.random() * 900000);
};

//This method will collect all detail of News along with Images using Innerjoin..
var GetAllPublishedNews = async (req, res) => {
    try {
        var findoc = await newsdb.aggregate([{
                $match: {
                    NewsStatus: true,
                    IsNewsPublished: true
                }
            },
            {
                $lookup: {
                    from: 'model.newscategories',
                    localField: 'CategoryId',
                    foreignField: '_id',
                    as: 'NewsUnique'
                }
            },
            {
                $lookup: {
                    from: 'model.uploadedimages',
                    localField: 'NewsUID',
                    foreignField: 'ImageRef',
                    as: 'finImages'
                }
            },
        ]);
        var AllNewsDetail = [];
        //var findb = [];
        for (var i = 0; i < findoc.length; i++) {
            AllNewsDetail.push(findoc[i]);
        }
        return AllNewsDetail;
        //  console.log(AllNewsDetail);
    } catch (error) {
        res.status(500);
    }
};

// Start method for Gernal News Corner
var GernalCornerNews = async (req, res) => {
    var getall = [];
    var GenImgNews = [];
    var findb = [];
    getall = await GetAllPublishedNews();
    for (var i = 0; i < getall.length; i++) {
        findb = getall[i].NewsUnique;
        for (var j = 0; j < findb.length; j++) {
            if (findb[j].NCRefNum === "GN1101") {
                GenImgNews.push(getall[i]);
                //console.log(findoc[i]);
            }
        }
    }
    res.send(GenImgNews);
    //console.log(GenImgNews);
};

var GetallNewsById = async (req, res) => {
    var _id = req.params.id;

    //req.body.NewsId="5cdade8988c71419dc64d94c";
    try {
        const newsbyId = await modelnewsdb.find({
            '_id': _id
        });
       // console.log(newsbyId);
        res.send(newsbyId);
    } catch (error) {
        res.status(500);
    }
};
var getfinanceCorner = async (req, res) => {
    var allImageDoc = [];
    try {
        var docs = await Imagesmodel.aggregate([{
            $lookup: {
                from: 'model.news',
                localField: 'ImageRef',
                foreignField: 'NewsUID',
                as: 'NewsUnique'
            }
        }]);
        // var strfy = JSON.stringify(docs);
        for (var i = 0; i < docs.length; i++) {
            if (docs[i].IsImagesPublished !== false) {
                allImageDoc.push(docs[i]);
                //console.log(allImageDoc);
            }
        }
        res.send(allImageDoc);
    } catch (error) {
        res.status(500);
    }
};
var PoliticalCorner = async (req, res) => {};

var UpdateNews = async (req, res) => {
    var _id = req.body._id;     
    console.log(_id);
   // var NewsPlace = req.body.NewsPlace;
   // var NewsStatus = req.body.NewsStatus;
    newsdb.update({
            _id: req.body._id
            
        }, {
            $set: {
                NewsPlace: req.body.NPlaceRef,
                NewsStatus:req.body.ActiveName,                
                IsNewsPublished: req.body.ActiveName
            }
        },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result );
                console.log( "News has been updated and published");
            }

        });
    res.send(newsdb);
};









module.exports = {
    GetAllPublishedNews,
    // GetallNews,
    Post_News,
    getNewsDetail,
    getBreakingNews,
    // GetImages_GernalCorner,
    //GetAllDetail,
    GernalCornerNews,
    getNewsPlaces,
    //GetNewsById,
    GetallNewsById,
    getfinanceCorner,
    PoliticalCorner,
    UpdateNews



};