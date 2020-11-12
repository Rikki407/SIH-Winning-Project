const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password:{
    type: String
    // required: true
  },
  state:{
    type: String
  },

  phone:{
    type: Number
  },

  date:{
    type:Date,
    default: Date.now
  },
  
  type:{
    type: String,
    default: "hospital"
  },
  
});

module.exports = User = mongoose.model('hospital', UserSchema);
