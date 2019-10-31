var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uploadedImages = mongoose.Schema({
    Imagepath: {
        type: [String]
    },
    ImageRef: {
        type: String,
        unique:true
    },
    EnterdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    IsImagesPublished: {
        type: Boolean

    },
    Filecount: {
        type: Number
    }


});

module.exports = mongoose.model("model.uploadedImages", uploadedImages);