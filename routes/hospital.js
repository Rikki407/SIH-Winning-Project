var express = require('express');
var router = express.Router({ mergeParams: true });
var Hospital = require("../models/Hospital")
const bcrypt = require('bcryptjs');

// var hos = new Hospital({
//     name: "Army Hospital",
//     email: "army@gmail.com",
//     state: "Delhi",
//     pass: "123"
// })

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(hos.password, salt, (err, hash) => {
//       //   if (err) throw err;
//       hos.password = hash;
//       hos
//         .save()
//         .then(created=>{
//             console.log("Hospital created "+ created)
//         })
//     })
// })
router.post('/create', (req, res) => {
    
    var hos = new Hospital({
        name: "Max Hospital",
        email: "max@gmail.com",
        state: "Delhi",
        pass: "123"
    })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(hos.password, salt, (err, hash) => {
          //   if (err) throw err;
          hos.password = hash;
          newEmploy
            .save()
            .then(created=>{
                console.log("Hospital created "+ created)
            })
        })
    })

    // res.render('chatbot/chat-index', {drName:"Dr Harshit"});
});


module.exports = router;