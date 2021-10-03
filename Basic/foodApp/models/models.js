const mongoose = require("mongoose");
const { db_link } = require("../auth");

const validator = require("email-validator");
mongoose
  .connect(db_link)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function validate() {
      return validator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  confirmpassword: {
    type: String,
    required: true,
    min: 8,
    validate: function validate() {
      return this.password == this.confirmpassword;
    }
  },
    token :String,
  
});

// hook
userSchema.pre("save", function (next) {
  this.confirmpassword = undefined;
  next();
});

const userModel = new mongoose.model("userModel", userSchema);

module.exports = userModel;

// let fn = async function createUser(){
//  let user ={
//      name:"abc",
//      age:10,
//      email:"abcgfhgf",
//      password:"12345678",
//      confirmpassword:"12345678"
//  };
//  let userObj = await userModel.create(user);
//   console.log(userObj);
// }();
