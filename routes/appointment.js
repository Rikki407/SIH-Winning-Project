var express = require('express');
const Appointment = require('../models/Appointment');
var router = express.Router({ mergeParams: true });

router.post('/create', (req, res) => {
    
    datetime = req.body.datetime;
    var start = new Date(datetime)

    var appointment = new Appointment({
        patient_id: currentUser.id,
        patient_email: currentUser.email,
        patient_name: currentUser.name,
        desc: req.body.desc,
        hospital_name: req.body.hospital_name,
        appointment_time: start,
        service: req.body.service
    })

    appointment.save().then(created=>{
        console.log("appointment created", created)
        res.redirect('back')
    }).catch(err=>{ console.log(err); res.send("n/w issue while creating appointment, try again")})
    // res.render('chatbot/chat-index', {drName:"Dr Harshit"});
});


module.exports = router;