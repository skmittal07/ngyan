var express = require('express');
var app = express();
var body = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ngyan');
var newsdb = require("../Model/model.News");
var modelnewsdb = mongoose.model("model.News");
var NewsPlacedb = require("../Model/model.NewsPlace");
var newsPlacemod = mongoose.model("model.NewsPlace");
var Imagesmodel = require('../Model/model.uploadedImages');

var cors = require('cors');
app.use(cors());
app.use(body.json());


var publishedNews = async (req, res) => {
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
        res.send(AllNewsDetail);
         //console.log(AllNewsDetail);
    } catch (error) {
        res.status(500);
    }
};


module.exports = {
    publishedNews
};