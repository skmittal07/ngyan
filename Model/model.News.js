var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var ObjectId=Schema.Types.ObjectId;

var tblNews = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewsCategories'
    },
    Caption: {
        type: String,
        required: true
    },
    News: {
        type: String,
        required: true
    },
    NewsDate: {
        type: String,
        required: true
    },
    NewsTime: {
        type: String,
        required: true
    },
    EnterdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
NewsPlace:{
    type:String,
    defualt:false
},
    IsNewsPublished: {
        types: Boolean,
        defualt: false
    },
    NewsPublishedDate: Date,
    NewsStatus: {
        type: Boolean,
        defualt: true
    },
    NewsUID: {
        type: String,
        unique:true
    }
   

})

module.exports = mongoose.model("model.News", tblNews);