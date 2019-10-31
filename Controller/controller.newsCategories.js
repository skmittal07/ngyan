var express = require('express');
var app = express();
var body = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/ngyan');
var CollectNewsCategories = require('../Model/model.NewsCategories');
var modelNewsCategories = mongoose.model("model.NewsCategories");

app.use(body.json());


var PostNewsCategories = (async (req, res) => {
    try {
        var NewsCate = new modelNewsCategories();
        NewsCate.NCategory = req.body.NCategory;
        NewsCate.NCRefNum = req.body.NCRefNum;
        NewsCate.NCStatus = req.body.NCStatus=true;
        await NewsCate.save();
        res.send(NewsCate);
        console.log(NewsCate);

    } catch (error) {
        res.status(500);
        console.log(error);

    }
});
const GetNewsCategories = async (req, res) => {
    try {
        const NewsCategorylist = await modelNewsCategories.find({});
        res.send(NewsCategorylist);
    } catch (error) {
        res.status(500);
    }
}
const GetNewsbyId = async (req, res) => {
    try {
        const getNews = await modelNewsCategories.find({
            _id: req.params.Id
        })
        res.send(getNews);
        console.log(getNews);
    } catch (error) {
        res.send(500);

    }
}
module.exports = {
    PostNewsCategories,
    GetNewsCategories,
    GetNewsbyId
}