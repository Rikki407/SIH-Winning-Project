var express = require('express');
var router = express.Router({ mergeParams: true });
var Reminder = require("../models/Reminder")

router.post('/create', (req, res) => {
    console.log("schedule")
    datetime = req.body.datetime;
    var start = new Date(datetime)
    // console.log(start,currentUser)
    var rem =  new Reminder({
        patient_id: currentUser.id,
        reminder_time: start,
        patient_email: currentUser.email,
        patient_name: currentUser.name,
        medicine: req.body.medicine
    })
    rem.save().then(created=>{
        console.log(created);
        res.redirect("back")
    }).catch(err=>{res.send("Error while adding schedule"); console.log(err)})
    // res.render('chatbot/chat-index', {drName:"Dr Harshit",test:"route !!!"});
});


module.exports = router;