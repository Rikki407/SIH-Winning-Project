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
  age:{
    type: Number
  },
  
  state:{
    type: String
  },

  gender:{
    type: String,
    enum:["male","female"]
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
    enum:["reception","lab","pharma","admin"]
  },
  hospital:{
      type: String
  },
  post:{
      type: String
  },
  password:{
    type: String
    // required: true
  },
  rec_medicines:[
      {
          type : String
      }
  ],
  

});

module.exports = User = mongoose.model('agent', UserSchema);
