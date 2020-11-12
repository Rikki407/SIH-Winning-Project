const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  aadhaar: {
    type: String
  },
  name: {
    type: String
  },
  password:{
    type: String
    // required: true
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

  city:{
    type: String,
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
    default: "patient"
  },
  
  image:{
    type: String,
    default: "../data/profile/profile.jpg"
  }


});

module.exports = User = mongoose.model('patient', UserSchema);


// reports:[
//     {
//       image:{
//           type: String
//         },
//         date:{
//           type:Date,
//           default: Date.now
//         },
//     }
// ],


// joining_date: {
//   type: Date,
//   default: Date.now
// },
// refer_code:{
//   type:String
// },
// referred_code:{
//   type: String
// },

// referred_by_name:{
//   type: String
// },
// referred_by_phone:{
//   type: String
// },
// use_time:{
//   type: Number,
//   default: 0
// },

// active_time:{
//   type: Number,
//   default: 0
// },

// wallet_balance:{
//   type:Number,
//   default:0
// },
// total_news_read:{
//   type: Number,
//   default: 0
// },

// self_time_redeemed:{
//   type: Number,
//   dafault: 0
// },
// refer_friend_earning_time:{
//   type: Number,
//   default: 0
// },

// ad_time:[
//   {
//     date:{
//       type: String
//     },
//     count:{
//       type: Number
//     }
//   }
// ],
// ad_view:[
//   {
//     date:{
//       type: String
//     },
//     count:{
//       type: Number
//     }
//   }
// ],
// ad_click:[
//   {
//     date:{
//       type: String
//     },
//     count:{
//       type: Number
//     }
//   }
// ],
// news_read:[
//   {
//     date:{
//       type: String
//     },
//     count:{
//       type: Number
//     }
//   }
// ],

// referred_friends: [
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: 'users'
//     },
//     name:{
//       type:String
//     },
//     time_redeemed:{
//       type: Number,
//       default: 0
//     },
//     date: {
//       type: Date,
//       default: Date.now        
//     }
//   }
// ],

// redeem_history:[
//   {
//     name:{
//       type: String
//     },
//     amount:{
//       type: Number,
//       required: true    
//     },
//     date: {
//       type: Date,
//       default: Date.now
//     },
//     status:{
//       type: String
//     },
//     time_redeemed:{
//       type:Number
//     },
//     total_time:{
//       type: Number
//     }
//   }
// ],

// credit_history:[
//   {
//     name:{
//       type: String
//     },
//     amount:{
//       type: Number,
//       required: true    
//     },
//     date: {
//       type: Date,
//       default: Date.now
//     },
   
//     status:{
//       type: String
//     }
//   }
// ]