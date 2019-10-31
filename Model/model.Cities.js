var mongoose = require("mongoose");

var Cities = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    City: {
        Types: String,
        required: true
    },
    StateId:{
        Types: mongoose.Schema.Types.ObjectId,
        ref:'State'
    },
    CityStatus: {
        Types: boolean,
        default: true
    }

})
module.exports=mongoose.model("City",Cities);