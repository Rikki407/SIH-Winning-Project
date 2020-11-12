var express = require('express');
var router = express.Router({ mergeParams: true });
var axios = require('axios');
var moment = require('moment');
var localStorage = require('localStorage');
var setAuthToken = require('../public/utils/setAuthToken');
var jwt_decode = require('jwt-decode');
var middleware = require('../middleware/index.js');
const crypto = require('crypto');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'),
    Tesseract = require('tesseract.js'),
    fs = require('fs');

router.get('/register', (req, res) => {
    res.render('auth/ui-register');
});

router.post('/login', (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);

    var errors = {};
    // Check Validation
    //   if (!isValid) {
    //     return res.status(400).json(errors);
    //   }

    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // Find user by email
    if (req.body.type == 'doctor') {
        Doctor.findOne({ email }).then((user) => {
            // Check for user
            if (!user) {
                errors.email = 'Employ not found';
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    // User Matched
                    const payload = {
                        id: user._id,
                        name: user.name,
                        type: user.type,
                        email: user.email,
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
                            // console.log(currentUser);
                            res.redirect('/hos-doctor-dash');
                        }
                    );
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(400).json(errors);
                }
            });
        });
    }
    if (req.body.type == 'patient') {
        Patient.findOne({ email }).then((user) => {
            // Check for user
            if (!user) {
                errors.email = 'Employ not found';
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    // User Matched
                    const payload = {
                        id: user._id,
                        name: user.name,
                        type: user.type,
                        email: user.email,
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
                            // console.log(currentUser);
                            res.redirect('/');
                        }
                    );
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(400).json(errors);
                }
            });
        });
    }
});

//Middle Register Page
var fullTextAnotation =
    'trtt rrgg GOVENNMENT OF INDIA wrte mik Rishab Lamba DOB: 02-11-1998 Gender:Male     5180 1641 0015';
router.get('/patient-register', (req, res) => {
    res.render('auth/patient-register');
});

router.post('/image', (req, res) => {
    // strip off the data: url prefix to get just the base64-encoded bytes
    var data = req.body.img.replace(/^data:image\/\w+;base64,/, '');
    var buf = new Buffer(data, 'base64');
    var datetime = new Date();
    fs.writeFile(`public/assets/images/image${datetime}.png`, buf, (err) => {
        if (err) console.log(err);
    });
    quickstart(datetime, res);
});

async function quickstart(datetime, res) {
    const myImage = `./public/assets/images/image${datetime}.png`;
    let fullTextAnnotation = '';
    Tesseract.recognize(myImage, 'eng', { logger: (m) => console.log(m) }).then(
        ({ data: { text } }) => {
            fullTextAnnotation = text;
            console.log(fullTextAnotation);
            res.render('xmr/aadhaar', { rikki_text: fullTextAnnotation });
        }
    );
}

router.get('/:id', async (req, res) => {
    console.log(' ');
    console.log('Authorizing ' + req.params.id);
    await sleep(1000);
    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    console.log('"actions":[');
    console.log('   {');
    console.log('       "header": {');
    console.log('           "creator":{');
    console.log('               "id_bytes": "LS0TLs1CRudJTi7NKLLdew2NidcRC",');
    console.log('               "mspid": "Org1MSP"');
    console.log('           },');
    console.log('           "nonce":"ywqIENpDpEZjxo9e2DWmc2JSYQLz"');
    console.log('       },');
    console.log('       "payload":{');
    console.log('           "chaincode_proposal_pay load " :{');
    console.log('                "input": {');
    console.log('                    "chaincode_spec": { ');
    console.log('                         "chaincode id": { ');
    console.log('                             "name": "Iscc", ');
    console.log('                             "path" : "version":');
    console.log('                             "input": { ');
    console.log('                                 "args":[');
    console.log('                                    "ZGVwbG95" ,');
    console.log('                                    "bXlj aGFubmVs" , ');
    console.log(
        '                                    "CN•11ARINEgZmYWJj YX1aAzEd4BoA" ,'
    );
    console.log(
        '                                    "EggSBggBEg11ABoLEgkKBØ9yZzFNUIA=" '
    );
    console.log('                                    "drwj" ');
    console.log('                                 ],');
    console.log('                              "decorations":{}  ');
    console.log('                              },');
    console.log('                             "timeout": 0');
    console.log('        }');
    console.log('    }');
    console.log(']');
    res.redirect('back');
});

module.exports = router;
