var mongoose = require("mongoose");

var IsAuthorizedUsers = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserId: {
        Types: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    OTPNumber: String,
    IsOTPMatc: {
        Types: boolean,
        default: false
    },

    IsUserAllowed: {
        Types: boolean,
        default: false
    },
    Userfilldate: {
        Types: Date,
        default: Date.now
    },
    AuthoUserStatus: boolean
})

module.exports= mongoose.model("IsuserAuthorized",IsAuthorizedUsers);