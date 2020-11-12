const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: 'patients'
  },
  patient_email: {
    type: String
  },
  patient_name:{
    type: String
    // required: true
  },
  hospital_id:{
    type: Schema.Types.ObjectId,
    ref: 'hospitals'
  },

  hospital_name:{
    type: String
  },
  desc:{
      type: String
  },
  service:{
    type: String
  },
  appointment_time:{
    type:Date
  },
  date:{
    type:Date,
    default: Date.now
  },
  complete:{
    type: Boolean,
    default: false
  },
  type:{
    type: String,
    default: "appointment"
  },
  
});

module.exports = User = mongoose.model('appointment', UserSchema);
