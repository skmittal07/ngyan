var mongoose = require("mongoose");

var States = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    State: {
        Types: String,
        required: true
    },
    CountryId:{
        Types: mongoose.Schema.Types.ObjectId,
        ref:'Country'
    },
    StateStatus: {
        Types: boolean,
        default:true
    }

})
module.exports=mongoose.model("State",States);