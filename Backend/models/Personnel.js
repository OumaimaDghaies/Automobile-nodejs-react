const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PersonnelSchema = new Schema({
fname: {
type:String,
required:true,
},
lname: {
    type:String,
    required:true,
    },
email: {
type:String,
required:true,
unique:true,
},
birth_date:{
    type:Date,
default: Date.now()
} , 
phone_number: {
type:Number,
required:true,
},
cin:{
type:Number,
required:true,
},

address: {
type: String,
required:true,
},

gender: {
type: String,
enum : ['male', 'female']
},

date_emb :{
    type:Date,
    default: Date.now(),
},

salary :{
    type: Number,
    required:true,
}



});
module.exports = Personnel = mongoose.model("personnel", PersonnelSchema);