const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({

    id:{
        type:Number,
        unique:true,
        required:true
    },
 
    name:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        
    },

    price:{
        type:Number,
        required:true
    },

    delivery:{
      type:Boolean,
      required:true
    },

    meals:{
        type:Number,
        required:true
    },

    discription:{
       type:String
    }


})