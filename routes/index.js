var express = require('express');
var router = express.Router({ mergeParams: true });
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var localStorage = require('localStorage');
var setAuthToken = require('../public/utils/setAuthToken');
var jwt_decode = require('jwt-decode');
var middleware = require('../middleware/index.js');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Prescriptions = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Agent = require('../models/Agents');
const Hospital = require('../models/Hospital');
const Appointment = require('../models/Appointment');

const seedDB = require('./patient_seed');

const mongoURI =
    'mongodb+srv://root:root@init.qtbg2.mongodb.net/sih?retryWrites=true&w=majority';

const conn = mongoose.createConnection(mongoURI);

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connected');
        // seedDB();
    })
    .catch((error) => {
        console.log(error);
    });

router.get('/', middleware.isLoggedIn, (req, res) => {
    res.redirect('/hos-patient-dash');
});

router.get('/register', (req, res) => {
    res.render('auth/ui-register');
});

router.get('/login', (req, res) => {
    res.render('auth/ui-login');
});

router.get('/pharmacy', (req, res) => {
    const foundpres = null;

    Prescriptions.find({}, (err, pres) => {
        // console.log("a for apple")
        if (err) {
            console.log(err);
        } else {
            res.render('pharmacy/pharmacy', {
                pres: pres,
                foundpres: foundpres,
            });
        }
    });
});

router.post('/pharmacy', (req, res) => {
    const id = req.body.search;

    var presFinal;
    Prescriptions.find({}, (err, pres) => {
        if (err) {
            console.log(err);
        } else {
            presFinal = pres;
            Prescriptions.findById(id, (err, foundpres) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(foundpres);
                    res.render('pharmacy/pharmacy', {
                        pres: presFinal,
                        foundpres: foundpres,
                    });
                }
            });
        }
    });
});

// Billing
router.get('/hos-add-payment', middleware.isLoggedIn, (req, res) => {
    res.render('billing/hos-add-payment');
});
router.get('/hos-patient-invoice', middleware.isLoggedIn, (req, res) => {
    res.render('billing/hos-patient-invoice');
});
router.get('/hos-payment', middleware.isLoggedIn, (req, res) => {
    res.render('billing/hos-payment');
});

//Doctor Links
router.get('/hos-add-doctor', middleware.isLoggedIn, (req, res) => {
    res.render('doctor/hos-add-doctor');
});

router.get('/hos-all-doctors', middleware.isLoggedIn, (req, res) => {
    res.render('doctor/hos-all-doctors');
});

router.get('/hos-doctor-dash', middleware.isLoggedIn, (req, res) => {
    Doctor.findById(currentUser.id).then((doc) => {
        Appointment.find({
            hospital_name: doc.hospital,
            service: doc.service,
            complete: false,
        }).then((app) => {
            console.log('doc-appointments', app);
            res.render('doctor/hos-doctor-dash', { app });
        });
    });
});

router.get('/hos-doctor-profile', middleware.isLoggedIn, (req, res) => {
    res.render('doctor/hos-doctor-profile');
});

router.get('/hos-edit-doctor', middleware.isLoggedIn, (req, res) => {
    res.render('doctor/hos-edit-doctor');
});

router.get('/view-prescription/:id', middleware.isLoggedIn, (req, res) => {
    var id = req.params.id;
    Prescriptions.findById(id).then((p) => {
        res.render('patients/view-prescription', { p, moment });
    });
});

// Lab Routes

router.get('/form-add-report', middleware.isLoggedIn, (req, res) => {
    res.render('lab/form-add-report');
});

router.get('/lab-dash', middleware.isLoggedIn, (req, res) => {
    res.render('lab/lab-dashboard');
});

// Patients

router.get('/hos-add-patient', middleware.isLoggedIn, (req, res) => {
    res.render('patients/hos-add-patient');
});

router.get('/hos-all-patients', middleware.isLoggedIn, (req, res) => {
    Patient.find({}, (err, patients) => {
        if (err) {
            console.log(err);
        } else {
            res.render('patients/hos-all-patients', {
                patients: patients,
            });
        }
    });
});

router.get(
    '/hos-book-appointment-patient',
    middleware.isLoggedIn,
    (req, res) => {
        var hospitals = Hospital.find().then((hospitals) => {
            console.log(hospitals);
            res.render('patients/hos-book-appointment-patient', { hospitals });
        });
    }
);

router.get('/hos-edit-patient', middleware.isLoggedIn, (req, res) => {
    res.render('patients/hos-edit-patient');
});

router.get('/hos-patient-dash', middleware.isLoggedIn, (req, res) => {
    Appointment.find({ patient_id: currentUser.id })
        .sort({ appointment_time: -1 })
        .then((list) => {
            res.render('patients/hos-patient-dash', { list, moment });
        })
        .catch((err) => {
            console.log(err);
            res.send('N/W issue');
        });
});

router.get('/hos-patient-profile', middleware.isLoggedIn, (req, res) => {
    res.render('patients/hos-patient-profile');
});

router.get('/patients-prescriptions', middleware.isLoggedIn, (req, res) => {
    Prescriptions.find({ user_id: currentUser.id })
        .sort({ created: -1 })
        .then((pres) => {
            res.render('patients/patients-prescriptions', { moment, pres });
        });
});

router.get('/patients-reports', middleware.isLoggedIn, (req, res) => {
    res.render('patients/patients-reports');
});

// Pharmacy routes
router.get('/form-add-prescription', middleware.isLoggedIn, (req, res) => {
    res.render('pharmacy/form-add-prescription');
});

// Reception routes

router.get(
    '/hos-book-appointment-reception',
    middleware.isLoggedIn,
    async (req, res) => {
        res.render('reception/hos-book-appointment-reception', { hospitals });
    }
);

router.get('/hos-events', middleware.isLoggedIn, (req, res) => {
    res.render('reception/hos-events');
});
router.get('/hos-schedule', middleware.isLoggedIn, (req, res) => {
    res.render('reception/hos-schedule');
});
router.get('/index-hos-dashboard', middleware.isLoggedIn, (req, res) => {
    res.render('reception/index-hos-dashboard');
});
router.get('/reception', middleware.isLoggedIn, (req, res) => {
    res.render('reception/reception');
});

router.post('/register', async (req, res) => {
    var errors = {};
    console.log(req.body);
    // var model ;
    // var type;
    if (req.body.type == 'patient') {
        // await Patient.findOne({ email: req.body.email }).then(employ => {
        //           if (employ) {
        //             errors.email = 'Email already exists';
        //             return res.status(400).json(errors);
        //       }});

        // console.log(req.body.password);

        const newEmploy = new Patient({
            name: req.body.username,
            password: req.body.password,
            email: req.body.email.toLowerCase(),
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newEmploy.password, salt, (err, hash) => {
                //   if (err) throw err;
                newEmploy.password = hash;
                newEmploy
                    .save()
                    .then((employ) => {
                        const payload = {
                            id: employ._id,
                            name: employ.name,
                            type: employ.type,
                            email: employ.email,
                        }; // Create JWT Payload

                        // Sign Token
                        jwt.sign(
                            payload,
                            'SIH',
                            { expiresIn: 3600 },
                            (err, token) => {
                                // Set token to ls
                                localStorage.setItem('jwtToken', token);
                                // Set token to Auth header
                                setAuthToken(token);
                                // Decode token to get user data
                                const decoded = jwt_decode(token);
                                currentUser = payload;
                                req.currentUser = payload;
                                console.log(currentUser);
                                res.redirect('/auth/patient-register');
                            }
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        errors.password =
                            'something went wrong , please try again';
                        res.status(400).json(errors);
                    });
            });
        });
    } else if (req.body.type == 'hospital') {
        // await Hospital.findOne({ email: req.body.email }).then(employ => {
        //     if (employ) {
        //       errors.email = 'Email already exists';
        //       return res.status(400).json(errors);
        // }});

        // console.log(req.body.password);

        const newEmploy = new Hospital({
            name: req.body.username,
            password: req.body.password,
            email: req.body.email.toLowerCase(),
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newEmploy.password, salt, (err, hash) => {
                //   if (err) throw err;
                newEmploy.password = hash;
                newEmploy
                    .save()
                    .then((employ) => {
                        const payload = {
                            id: employ._id,
                            name: employ.name,
                            type: employ.type,
                            email: employ.email,
                        }; // Create JWT Payload

                        // Sign Token
                        jwt.sign(
                            payload,
                            'SIH',
                            { expiresIn: 3600 },
                            (err, token) => {
                                // Set token to ls
                                localStorage.setItem('jwtToken', token);
                                // Set token to Auth header
                                setAuthToken(token);
                                // Decode token to get user data
                                const decoded = jwt_decode(token);
                                currentUser = payload;
                                req.currentUser = payload;
                                console.log(currentUser);
                                res.redirect('/index-hos-dashboard');
                            }
                        );
                    })
                    .catch((err) => {
                        errors.password =
                            'something went wrong , please try again';
                        res.status(400).json(errors);
                    });
            });
        });
    } else if (
        req.body.type == 'lab' ||
        req.body.type == 'pharma' ||
        req.body.type == 'reception'
    ) {
        // await Patient.findOne({ email: req.body.email }).then(employ => {
        //     if (employ) {
        //       errors.email = 'Email already exists';
        //       return res.status(400).json(errors);
        // }});

        // console.log(req.body.password);

        const newEmploy = new Agent({
            name: req.body.username,
            password: req.body.password,
            email: req.body.email.toLowerCase(),
            type: req.body.type,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newEmploy.password, salt, (err, hash) => {
                //   if (err) throw err;
                newEmploy.password = hash;
                newEmploy
                    .save()
                    .then((employ) => {
                        const payload = {
                            id: employ._id,
                            name: employ.name,
                            type: employ.type,
                            email: employ.email,
                        }; // Create JWT Payload

                        // Sign Token
                        jwt.sign(
                            payload,
                            'SIH',
                            { expiresIn: 3600 },
                            (err, token) => {
                                // Set token to ls
                                localStorage.setItem('jwtToken', token);
                                // Set token to Auth header
                                setAuthToken(token);
                                // Decode token to get user data
                                const decoded = jwt_decode(token);
                                currentUser = payload;
                                req.currentUser = payload;
                                console.log(currentUser);
                                if (newEmploy.type == 'lab') {
                                    res.redirect('/lab-dash');
                                } else if (newEmploy.type == 'pharma') {
                                    res.redirect('/pharmacy');
                                } else {
                                    res.redirect('/index-hos-dashboard');
                                }
                            }
                        );
                    })
                    .catch((err) => {
                        errors.password =
                            'something went wrong , please try again';
                        res.status(400).json(errors);
                    });
            });
        });
    } else if (req.body.type == 'doctor') {
        const newEmploy = new Doctor({
            name: req.body.username,
            password: req.body.password,
            email: req.body.email.toLowerCase(),
        });
        console.log('!!!!!!!!');
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newEmploy.password, salt, (err, hash) => {
                //   if (err) throw err;
                newEmploy.password = hash;
                newEmploy
                    .save()
                    .then((employ) => {
                        const payload = {
                            id: employ._id,
                            name: employ.name,
                            type: employ.type,
                            email: employ.email,
                        }; // Create JWT Payload

                        // Sign Token
                        jwt.sign(
                            payload,
                            'SIH',
                            { expiresIn: 3600 },
                            (err, token) => {
                                // Set token to ls
                                localStorage.setItem('jwtToken', token);
                                // Set token to Auth header
                                setAuthToken(token);
                                // Decode token to get user data
                                const decoded = jwt_decode(token);
                                currentUser = payload;
                                req.currentUser = payload;
                                console.log(currentUser);
                                res.redirect('/hos-doctor-dash');
                            }
                        );
                    })
                    .catch((err) => {
                        console.log(err);
                        errors.password =
                            'something went wrong , please try again';
                        res.status(400).json(errors);
                    });
            });
        });
    }
});

module.exports = router;
