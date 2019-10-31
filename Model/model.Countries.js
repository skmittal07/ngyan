var mongoose = require("mongoose");

var Countries = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Country: {
        Types: String,
        required: true
    },
    CountryStatus: {
        Types: boolean,
        default: true
    }

})
module.exports=mongoose.model("Country",Countries);