const bcrypt=require('bcrypt');
const mongoose=require("mongoose");

const userlogSchema=mongoose.Schema({
Uname:{
    type:String,
    required:true
},
uPassword:{
    type:String,
    required:true
},
uMobile:{
    type:String,
    required:true
},
uEmail:{
    type:String,
    required:true   
},
userProfile:{
    type:String,    
},
uActive_DeActive:{
    type:Boolean,    
    required:true,
    default:true
}


});
userlogSchema.statics.hashPassword=function hashpassword(upassword){
    return bcrypt.hashSync(upassword,10);
}
userlogSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compare(hashedpassword, this.uPassword);
}

module.exports = mongoose.model("model.users", userlogSchema)