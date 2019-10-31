var express = require('express');
var app = express();
var _router = express.Router();
var body = require("body-parser");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mongoose = require("mongoose");
var cors = require('cors');

mongoose.connect('mongodb://localhost:27017/ngyan');
const Imagesmodel = require('../Model/model.uploadedImages');

app.use(body.json({
    limit: '50mb'
}));
app.use(body.urlencoded({
    extended: true
}));




app.use(cors());
var Orgname = [];

//var countfile = [];
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "E:/pplnews/src/assets/uploadimg/");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
        //Orgname = file.originalname;
        Orgname.push(file.originalname);
        //console.log(Orgname);

    }

});
var upload = multer({
    storage: Storage
}).array("imgUploader", 10);



imguploads = (async (req, res) => {
    const Imagedb = new Imagesmodel();
    var newsimgs = [];
    try {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Something went wrong!");
            }
            var count = req.files.length;

            Imagedb.EnterdBy = req.body.EnterdBy;
            Imagedb.ImageRef = getImg_random();
            Imagedb.IsImagesPublished = req.body.IsImagesPublished = false;
            Imagedb.Filecount = count;
            for (var img = 0; img < Orgname.length; img++) {
                //Imagedb.Imagepath.push("gyan_news/uploads/" + Orgname[img]);
                Imagedb.Imagepath.push("../assets/uploadimg/" + Orgname[img]);
            }
            Imagedb.save();
            res.send(Imagedb);
            return res.end("File uploaded sucessfully!.");
        });
    } catch (error) {
        res.status(500);
    }
});


//it will provide 6 digit randam
var getImg_random = function () {
    return Math.floor(1000 + Math.random() * 9000);
};


/*var PostImages = (async (req, res) => {
    debugger;

    try {
        const Imagedb = new Imagesmodel();

        Imagedb.EnterdBy = req.body.EnterdBy = "5c5c4fca3983932f14e20921";
        Imagedb.ImageRef = req.body.ImageRef = "img21319_1110sum";
        Imagedb.Imagepath = filename;
        Imagedb.IsImagesPublished = req.body.IsImagesPublished = false;

        await Imagedb.save();
        res.send(Imagedb);
        console.log(Imagedb);
    } catch (error) {
        res.status(500);
        // console.log(error);
    }
});*/
/*var getImages = async (req, res) => {

    var allImageDoc=[];
    try {
        var images = await Imagesmodel.find({});
        for (var i = 0; i < images.length; i++) {
            if (images[i].IsImagesPublished !== false) {
                 allImageDoc.push(images[i]);
                console.log(allImageDoc);
            }
        }
        res.send(allImageDoc);
    } catch (error) {
        res.status(500);
    }
};*/


module.exports = {
   // getImages_financeCorner,
    //PostImages,
    upload,
    imguploads
};