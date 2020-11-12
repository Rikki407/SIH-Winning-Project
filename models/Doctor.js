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
  password:{
    type: String
    // required: true
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
    default: "doctor"
  },
  hospital:{
      type: String
  },
  service:{
      type: String
  },

  rec_medicines:[
      {
          type : String
      }
  ],
  questions:[
      {
          type: String
      }
  ]

});

module.exports = User = mongoose.model('doctor', UserSchema);
