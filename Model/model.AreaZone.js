var mongoose = require("mongoose");

var AreaZone = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
   Area: {
        Types: String,
        required: true
    },
    CityId:{
        Types: mongoose.Schema.Types.ObjectId,
        ref:'City'
    },
    AreaStatus: {
        Types: boolean,
        default: true
    }

})
module.exports=mongoose.model("Area",Cities);