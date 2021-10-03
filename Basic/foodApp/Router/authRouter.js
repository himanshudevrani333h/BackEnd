const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/models");
const cookie = require("cookie-parser");
const {JWT_KEY }= require("../auth")
const jwt = require("jsonwebtoken");
const emailSender = require("../Helperfn/emailsender")
authRouter
.route("/signup")
.post(setCreatedAt, signupUser);


authRouter.route("/login").post(loginUser);

authRouter.route("/forgetPassword").post(forgetPassword);

authRouter.route("/resetPassword").post(resetPassword);

async function forgetPassword(req,res){
  try{
    let {email} = req.body;
    console.log({email});
    let user = await userModel.findOne({email});
    if(user){
      let token = 
      (Math.floor(Math.random() * 10000) + 10000)
          .toString().substring(1);
     let updateRes = await userModel.updateOne({email},{token});
      console.log("32",updateRes);

      let newUser = await userModel.findOne({ email });
      console.log(newUser);
      await emailSender(token,email);

      res.status(200).json({
        message:"OTP has been sent",
        token
      })
    }else{
      res.status(400).json({
        message:"user not found"
      })
    }
  }catch(err){
    console.log(err);
    res.json({ message: err.message });
  }
}

async function resetPassword(req,res){
  try{
    let {token,password,confirmPassword} = req.body;
    console.log("token",{token});
    let user = await userModel.findOne({token});
    console.log("user",user);
    if( user ){
       user.password = password;
       user.confirmpassword= confirmPassword;
       user.token = undefined;
       await user.save();
       let updateUser = await userModel.findOne({email:user.email});
       res.status(200).json({
         message:"password has been reset",
         updateUser
       })
    }else{
      res.status(200).json({
        message:"user not found "
      })
    }
  }catch(err){
    res.status(200).json({
      message: err.message
    })
  }
}
function setCreatedAt(req, res, next) {
  let obj = req.body;
  //keys ka arr -> uska length
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res
      .status(400)
      .json({ message: "cannot create user if req.body is empty" });
  }
  req.body.createdAt = new Date().toISOString();
  next();
}

async function signupUser(req, res) {
  // let userDetails=req.body;
  // let name=userDetails.name;
  // let email=userDetails.email;
  // let password=userDetails.password;
  try {
    let userObj = req.body;
    // user.push({email,name,password});
    //put all data in mongo db
    // create document in userModel
    let user = await userModel.create(userObj);
    console.log("user", user);
    res.json({
      message: "user signedUp",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}



async function loginUser(req, res) {
  try {
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password == user.password) {
            let uid = user["_id"];
            let token = jwt.sign({id:uid},JWT_KEY);
          res.cookie('login',token,{httpOnly:true});
          return res.json({
            message: "logged in successfully",
          });
        } else {
          return res.json({
            message: "email or password is wrong",
          });
        }
      } else {
        return res.json({
          message: "email or password is wrong",
        });
      }
    } else {
      return res.json({
        message: "user is not present",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;
