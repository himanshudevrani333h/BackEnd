const express = require("express");
const userModel = require("../models/models");
const userRouter = express.Router();
const protectRoute = require("./authHelper")
userRouter
  .route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);



async function getUser(req, res) {
  try {
    console.log("get user called");
    let user = await userModel.find();
    if (user) {
      return res.json(user);
    } else {
      res.json({
        message: "users not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

// app.post('/user',createUser);
function createUser(req, res) {
  user = req.body;
  // console.log(req.body);
  res.send("data has been added succesfully");
}

// app.patch('/user',updateUser);
function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj[key];
  }
  res.json(user);
}

// app.delete('/user',deleteUser);
function deleteUser(req, res) {
  user = {};
  res.json(user);
  // res.send('ussr has been deleted');
}

//param route
// app.get('/user/:id',getUserById);

function getUserById(req, res) {
  console.log(req.params);
  res.json(req.params.id);
}

module.exports = userRouter;
