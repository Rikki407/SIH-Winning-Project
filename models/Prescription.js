const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const prescriptionSchema = new mongoose.Schema({
  image: String,
  name: String,
  doctor_name: String,
  doctor_id: {
    type: Schema.Types.ObjectId,
    ref: 'doctors'
  },
  user_name: String,
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  service:String,
  appointment_id:{
    type: Schema.Types.ObjectId,
    ref: 'appointments'
  },
  dop:{type: Date},
  med1: String,
  des1: String,
  tim1: String,
  med2: String,
  des2: String,
  tim2: String,
  med3: String,
  des3: String,
  tim3: String,
  med4: String,
  des4: String,
  tim4: String,
  created: { type: Date, default: Date.now }
});

module.exports = Post = mongoose.model('prescription', prescriptionSchema);
