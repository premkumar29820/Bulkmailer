
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({   //blueprint of email document
  subject: {
    type: String,
    required: true  //for compulsary
  },
  body: {
    type: String,
    required: true
  },
  recipients: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ["success", "failed"],
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now   //mail sent time save automatically
  }
});

module.exports = mongoose.model("Email", emailSchema); //create Email model by schema it use this line const Email=require("./models/Email")