const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },

  hospitalId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  requested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],

  token: {
    type: String,
  },

  accountType: {
    type: String,
    enum: ["donor", "hospital"],
    required: true,
  },

  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
