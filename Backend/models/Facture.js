const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FactureSchema = new Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
     
      Date: {
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
});


module.exports = Fact = mongoose.model("factures", FactureSchema);