var express = require('express');
var router = express.Router({ mergeParams: true });
const nodemailer = require('nodemailer');
const Appointment = require('../models/Appointment');
const utils = require('util');
const puppeteer = require('puppeteer');
const Prescription = require('../models/Prescription');

router.get('/add-prescription', (req, res) => {
    res.render('doctor/form-add-prescription');
});

async function getTemplateHtml(fields) {
    console.log('Loading template file in memory');
    try {
        let prescription = `<!DOCTYPE html>
        <html lang="en" dir="ltr">
            <head>
                <meta charset="utf-8" />
                <title></title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Dawning+of+a+New+Day&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;400;500&display=swap"
                    rel="stylesheet"
                />
                <style>
                    
                        .bod {
                            display: grid;
                            grid-template-rows: 100%;
                            grid-template-columns: 100%;
                            align-items: start;
                            justify-items: center;
                            height: 86vh;
                            padding: 20px;
                        }
        
                        .prescription-container {
                            box-shadow: 10px 10px 8px #888888;
                            background-image: url('https://banner2.cleanpng.com/20180215/ejq/kisspng-paper-white-black-rectangle-paper-png-5a85b5a22e20a6.6093163815187122261889.jpg');
                            background-size: 200%;
                            background-repeat: no-repeat;
                            background-position: center;
                            padding: 30px;
                            display: grid;
                            grid-template-areas:
                                'dr-name . . hos-name'
                                'dr-edu . . hos-ad'
                                'dr-clinic . . hos-mob'
                                'dr-clinic-ad . . prescription-id'
                                'dr-mob . . date1'
                                '. med1 med1 .'
                                '. med2 med2 .'
                                '. med3 med3 .'
                                '. . . sign'
                                'prescription-send-file prescription-send-file . .';
                        }
        
                        .dr-name {
                            grid-area: dr-name;
                        }
        
                        .prescription-id {
                            grid-area: prescription-id;
                        }
        
                        .hos-name {
                            grid-area: hos-name;
                        }
        
                        .dr-edu {
                            grid-area: dr-edu;
                        }
        
                        .hos-ad {
                            grid-area: hos-ad;
                        }
        
                        .dr-clinic {
                            grid-area: dr-clinic;
                        }
        
                        .hos-mob {
                            grid-area: hos-mob;
                        }
        
                        .dr-clinic-ad {
                            grid-area: dr-clinic-ad;
                        }
        
                        .dr-mob {
                            grid-area: dr-mob;
                        }
        
                        .med1 {
                            grid-area: med1;
                        }
        
                        .med2 {
                            grid-area: med2;
                        }
        
                        .med3 {
                            grid-area: med3;
                        }
        
                        .prescription-item {
                            color: #555555;
                            margin-bottom: -7px;
                        }
        
                        .hand {
                            font-family: 'Dawning of a New Day', cursive;
                            font-size: 30px;
                            color: #16264c;
                        }
        
                        .date1 {
                            padding-top: 25px;
                            padding-bottom: 30px;
                            grid-area: date1;
                        }
        
                        .med {
                            padding-bottom: 30px;
                        }
        
                        .sign {
                            grid-area: sign;
                            padding-bottom: 30px;
                        }
        
                        .bold1 {
                            font-weight: bold;
                        }
        
                        .prescription-send-file {
                            grid-area: prescription-send-file;
                            font-size: 18px;
                            font-weight: 400;
                            font-family: 'Roboto Mono', monospace;
                        }
        
                        .button5 {
                            background-color: transparent;
                            color: black;
                            border: 2px solid #555555;
                            padding: 15px 20px;
                        }
        
                        .button5:hover {
                            background-color: #555555;
                            color: white;
                        }
                    
                </style>
            </head>
            <body>
                <div class="bod">
                    <div class="prescription-container">
                        <div class="prescription-item bold1 dr-name">
                            Dr. M. D. RANJITH
                        </div>
                        <div class="prescription-item dr-edu">B.Sc., B.A.M.</div>
                        <div class="prescription-item dr-clinic">ANJALY AYRVEDICS</div>
                        <div class="prescription-item dr-clinic-ad">
                            Main Road, N. Paravur - 683 513
                        </div>
                        <div class="prescription-item dr-mob">Mob: 987046613</div>
                        <div class="prescription-item bold1 hos-name">
                            MOGUL AYRVEDA HOSPITAL
                        </div>
                        <div class="prescription-item hos-ad">
                            Edavilangu, Kodungallur
                        </div>
                        <div class="prescription-item hos-mob">Lad: 0480-2802520</div>
                        <div class="prescription-item prescription-id">0826127932</div>
                        <div class="prescription-item date1 hand">28/03/2020</div>
                        <div class="prescription-item med med1 hand">${fields.med1}</div>
                        <div class="prescription-item med med2 hand">${fields.med2}</div>
                        <div class="prescription-item med med3 hand">${fields.med3}</div>
                        <div class="prescription-item med med4 hand">${fields.med4}</div>
                        <div class="prescription-item sign hand">MDRanjith</div>
                    </div>
                </div>
            </body>
        </html>`;
        return prescription;
    } catch (err) {
        return Promise.reject('Could not load html template');
    }
}
function sendMail() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL || require('../Auth').user,
            pass: process.env.PASS || require('../Auth').pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    var mailOptions = {
        from: process.env.GMAIL || require('../Auth').user,
        to: 'rshblamba@gmail.com',
        subject: 'Prescription',
        text: 'Your prescription',
        attachments: [
            {
                path: './prescr.pdf',
            },
        ],
    };

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            //req.flash('error', 'error occured while sending mail');
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function generatePdf(fields) {
    let data = {};
    getTemplateHtml(fields)
        .then(async (res) => {
            // Now we have the html code of our template in res object
            // you can check by logging it on console
            // console.log(res)
            console.log('Compiing the template with handlebars');
            // const template = hb.compile(res, { strict: true });
            // we have compile our code with handlebars
            //
            // We can use this to add dyamic data to our handlebas template at run time from database or API as per need. you can read the official doc to learn more https://handlebarsjs.com/
            const html = res;
            // we are using headless mode
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            // We set the page content as the generated html by handlebars
            await page.setContent(html);
            // We use pdf function to generate the pdf in the same folder as this file.
            await page.pdf({ path: 'prescr.pdf', format: 'A4' });
            await browser.close();
            console.log('PDF Generated');
            sendMail();
        })
        .catch((err) => {
            console.error(err);
        });
}
router.post('/add-prescription', (req, res) => {
    // console.log(req.body)

    const {
        pname,
        pid,
        med1,
        des1,
        tim1,
        med2,
        des2,
        tim2,
        med3,
        des3,
        tim3,
        med4,
        des4,
        tim4,
    } = req.body;

    generatePdf(req.body);

    var p = new Prescription({
        image:
            'https://image.shutterstock.com/image-vector/document-folder-stamp-text-isolated-260nw-1373751197.jpg',
        doctor_name: currentUser.name,
        doctor_id: currentUser.id,
        user_name: pname,
        user_id: req.body.patient_id,
        service: pid,
        appointment_id: req.body.appointment,
        med1: med1,
        des1: des1,
        tim1: tim1,
        med2: med2,
        des2: des2,
        tim2: tim2,
        med3: med3,
        des3: des3,
        tim3: tim3,
        med4: med4,
        des4: des4,
        tim4: tim4,
    });

    p.save()
        .then((created) => {
            Appointment.findByIdAndUpdate(req.body.appointment, {
                complete: true,
            })
                .then((s) => {})
                .catch((err) => {
                    console.log(err);
                });

            console.log('prescription', created);
            res.redirect('/hos-doctor-dash');
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
