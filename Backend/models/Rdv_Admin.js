const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RdvSchema = new Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
     
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
});


module.exports = Rdv = mongoose.model("rdv_admin", RdvSchema);