const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarSchema = new Schema({
   
    matricule:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
      }, 
    model:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required:true,
    },
    
    transmission:{
        type: String,
        enum : ['automatique', 'manuelle'],
    },
    doors:{
        type: Number,
        required:true,
    },
    seats:{
        type: Number,
        required:true,
    },
    fuelType:{
        type: String,
        enum :['essence','diesel'] ,
    },

    carImage:{
       type: String,
        required: false,
    },
    
    description:{
        type: String,
        required: false,
    }
});

module.exports = Car = mongoose.model("car", CarSchema);