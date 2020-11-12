var express = require('express');
var router = express.Router({ mergeParams: true });
var Appointment =  require("../models/Appointment")
var Doctor = require("../models/Doctor")

router.get('/:app', (req, res) => {
    var id = req.params.app
    Appointment.findById(id).then(f=>{

        res.render('doctor/form-add-prescription',{f});

    })
});


module.exports = router;