const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    empNumber: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },  
  
    empType: {
        type: String,
        required: true,
       
    },
    // add new  user columns
    dateOfBirth:{
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
      },

    phoneNo: {
        type: Number,
        required: true,
        min: 0,
    },
 
    Address: {
        type: String,
        required: true,
        min: 0,
    },
 
    joindate: {
        type: String,
        required: true,
       
    },
    ivalutionDate: {
        type: String,
        required: true,
      
    },
   
    
    imageURL: {
        type: String,
        required: true,
    },

    filecv: {
        type: String,
        required: true,
    },
    // deleted flag for soft delete feature
    deleted: {
        type: Boolean,
        index: true,
        default: false
      }
    
},

);


module.exports = mongoose.model("Employees", EmployeeSchema);