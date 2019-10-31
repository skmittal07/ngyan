const mongoose = require("mongoose");

const NewsCategory = mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    NCategory: {
        type: String,
        required: true
    },
    NCRefNum:{
        type:String
    },
    NCStatus: {
        type: Boolean,      
        default: true
    }
});

module.exports = mongoose.model("model.NewsCategories", NewsCategory);