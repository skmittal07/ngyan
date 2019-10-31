var mongoose = require("mongoose");

var NewsPlaces = mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    NPlaces: {
        type: String,
        required: true
    },
    NPlaceRef: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("model.NewsPlace", NewsPlaces);
