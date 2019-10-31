var mongoose = require("mongoose");

var NewsVideos = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    NewsCateId: {
        Types: mongoose.Schema.Types.ObjectId,
        ref: 'NewsCategory'
    },
    NewsId: {
        Types: mongoose.Schema.Types.ObjectId,
        ref: 'News'
    },
    NewsVideos: Text,
    IsImagesPublished: {
        Types: boolean,
        default: false
    }
})
module.exports=mongoose.model("NewsVideos",NewsVideos);