const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RdvCSchema = new Schema({
    
      appointmentDate: {
        type: Date,
        required: true,
      },
      
      panneType: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      phone_number:{
        type: Number,
        required: true,
      }
});


module.exports = Rdv = mongoose.model("rdv_client", RdvCSchema);