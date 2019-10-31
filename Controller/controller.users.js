var express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var app = express();
var body = require("body-parser");
const mongoose = require("mongoose");
const conn=require('../routes/Connection.js');

//mongoose.connect('mongodb://localhost:27017/ngyan');
var user = require("../Model/model.users");
const modelusers = mongoose.model("model.users");
var cors = require('cors');


//const ngyanUrl="mongodb+srv://ngyanDB:gyan123@ngyan-qjtej.mongodb.net/test?retryWrites=true&w=majority";
const ngyanUrl="mongodb+srv://ngyanDB:gyan123@ngyan-qjtej.mongodb.net/ngyan?retryWrites=true&w=majority";

app.use(cors());
app.use(body.json());

var LoginAuth = async (req, res) => {
    try {
        user.findOne({
            uEmail: req.body.uEmail
        }, function (err, user) {
          
            if (err) throw err;
            if (!user) {
                res.status(401).json({
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                if (!user.isValid(req.body.Password)) {
                    res.status(401).json({
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    return res.json({
                        token: jwt.sign({
                            uEmail: user.uEmail,
                            Uname: user.Uname,
                            userProfile:user.userProfile,
                            _id: user._id
                        },'RESTFULAPIs')
                    });
                }
            }
        });
    } catch (error) {
        res.status(500);
    }
};
var Getuserdetail = async (req, res) => {
    try {
        const UserDetail = await modelusers.find({});
        res.send(UserDetail);
    } catch (erro) {
        res.status(500);
    }
};
var GetusrbyId = (async (req, res) => {
    try {
        const usrbyId = await modelusers.find({
            _id: req.params.Id
        });
        res.send(usrbyId);
        console.log(usrbyId);
    } catch (error) {
        res.status(500);
    }
});
var UpdateUserDetail = (async (req, res) => {
    try {
        const updateId = await modelusers.findByIdAndUpdate({
            _id: req.params.Id
        }, req.body, {
            new: true
        });
        res.send(updateId);
    } catch (error) {
        res.send(500);

    }

});
var Post_UsersDetail = (async (req, res) => {
    try {
        const userpost = new modelusers();
        userpost.Uname = req.body.Uname;
        //userpost.uPassword = req.body.uPassword;
        userpost.uPassword = user.hashPassword(req.body.uPassword);
        userpost.uMobile = req.body.uMobile;
        userpost.uEmail = req.body.uEmail;
        userpost.uActive_DeActive = req.body.uActive_DeActive = false;
        
        await userpost.save();
        res.send(userpost);
        console.log(userpost);
        
    } catch (error) {
        res.status(500);
        console.log(error);
    }
});
var UserDeActive = (async (req, res) => {
    try {
        const UserActiveDeActive = await modelusers.findByIdAndUpdate({
                _id: req.params.Id
            },
            req.body, {
                new: true
            })
        res.send(UserActiveDeActive)
    } catch (error) {
        res.status(500);
    }
});

module.exports = {
    Post_UsersDetail,
    GetusrbyId,
    Getuserdetail,
    UserDeActive,
    UpdateUserDetail,
    LoginAuth
};
