var express = require('express');
var router = express.Router({ mergeParams: true });
const nodemailer = require('nodemailer');
const Appointment = require('../models/Appointment');
const utils = require('util');
const puppeteer = require('puppeteer');
const Prescription = require('../models/Prescription');

router.get('/view-report', (req, res) => {
    res.render('lab/view-report');
});

async function getTemplateHtml(fields) {
    console.log('Loading template file in memory');
    try {
        let report = `<!DOCTYPE html>
        <html lang="en" dir="ltr">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;400;500&display=swap"
                    rel="stylesheet"
                />
                <meta charset="utf-8" />
                <title></title>
                <style>
                    .bod{
                      display: grid;
                      grid-template-rows: 100%;
                      grid-template-columns: 100%;
                      height: 100vh;
                      align-items: center;
                      justify-items: center;
                      height: 86vh;
                      padding: 20px;
                    }
        
                    .lab-report-container{
                      box-shadow: 10px 10px 8px #888888;;
                      background-image: url('https://banner2.cleanpng.com/20180215/ejq/kisspng-paper-white-black-rectangle-paper-png-5a85b5a22e20a6.6093163815187122261889.jpg');
                      background-repeat: no-repeat;
                      background-size: 200%;
                      background-position: center;
                      display: grid;
                      grid-template-areas: "head head head pinfo"
                                            ". . . ."
                                            "specimen . staken sreceived"
                                            ". . . ."
                                            ". . . ."
                                            "quan1 . vals1 range1"
                                            "remark1 remark1 remark1 remark1"
                                            ". . . ."
                                            ". . . ."
                                            "quan2 . vals2 range2"
                                            "remark2 remark2 remark2 remark2"
                                            ". . . ."
                                            ". . . ."
                                            ". . . ."
                                            ". . . ."
                                            "repid repid . send"
                                            "issued . received send";
                      padding: 50px;
                      grid-row-gap: 10px;
                      grid-column-gap: 20px;
                    }
        
                    .lab-report-item{
                      color: black;
                      font-size: 15px;
                      margin-bottom: 5px;
                      font-family: 'Roboto Mono', monospace;
                      font-weight: 200;
                    }
        
                    .make-bold{
                      font-weight: 500;
                    }
                    .head{
                      grid-area: head;
                      font-weight: 500;
                      font-size: 30px;
                      margin-bottom: 30px;
                      margin: 0;received
                    }
        
                    .pinfo{
                      grid-area: pinfo;
                      text-align: right;
                    }
        
                    .specimen
                    {
                      grid-area: specimen;
                    }
        
                    .staken
                    {
                      grid-area: staken;
                    }
        
                    .sreceived
                    {
                      grid-area: sreceived;
                    }
        
                    .quan1{
                      grid-area: quan1;
                    }
        
                    .vals1{
                      grid-area: vals1;
                    }
        
                    .range1{
                      grid-area: range1;
                    }
        
                    .remark1{
                      grid-area: remark1;
                    }
        
                    .quan2{
                      grid-area: quan2;
                    }
        
                    .vals2{
                      grid-area: vals2;
                    }
        
                    .range2{
                      grid-area: range2;
                    }
        
                    .remark2{
                      grid-area: remark2;
                    }
        
                    .repid{
                      grid-area: repid;
                    }
        
                    .issued{
                      grid-area: issued;
                    }
        
                    .received{
                      grid-area: received;
                    }
        
                    .report-send-file{
                      grid-area: send;
                      font-size: 18px;
                      font-weight: 400;
                    }
        
                    .button5 {
                      background-color: transparent;
                      color: black;
                      border: 2px solid #555555;
                    }
        
                    .button5:hover {
                      background-color: #555555;
                      color: white;
                    }
                </style>
            </head>
            <body>
                <div class="bod">
                    <div class="lab-report-container">
                        <h1 class="lab-report-item head">Vitamin B12 Test Report</h1>
                        <div class="lab-report-item make-bold pinfo" id="pinfo">
                            Name<br />
                            001
                        </div>
                        <div class="lab-report-item specimen make-bold">
                            Specimen: BLOOD
                        </div>
                        <div class="lab-report-item staken make-bold">
                            Specimen Taken: 14/11/2019 11:25
                        </div>
                        <div class="lab-report-item sreceived make-bold">
                            Specimen Received: 14/11/2019 12:25
                        </div>
                        <div class="lab-report-item quan1 make-bold">
                            Se holotranscobalamin conc
                        </div>
                        <div class="lab-report-item vals1" id="holotc"></div>
                        <div class="lab-report-item range1">>118.0 - 701.0 pmol/L</div>
                        <div class="lab-report-item remark1">
                            Low. But not indicative.
                        </div>
                        <div class="lab-report-item quan2 make-bold">
                            Serum vitamin B12
                        </div>
                        <div class="lab-report-item vals2" id="serumb12"></div>
                        <div class="lab-report-item range2">200 - 910 ng/L</div>
                        <div class="lab-report-item remark2">
                            OK for this patient. No further action.
                        </div>
                        <div class="lab-report-item repid">Report Id: 09820820</div>
                        <div class="lab-report-item issued">
                            Issued: 14/11/2019 16:00
                        </div>
                        <div class="lab-report-item received">14/11/2019 16:31</div>
                        <button
                            class="lab-report-item button5 report-send-file"
                            type="button"
                            name="button"
                        >
                            SEND FILE
                        </button>
                    </div>
                </div>
            </body>
        </html>`;
        return report;
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
                path: './report.pdf',
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
            await page.pdf({ path: 'report.pdf', format: 'A4' });
            await browser.close();
            console.log('PDF Generated');
            sendMail();
        })
        .catch((err) => {
            console.error(err);
        });
}
router.get('/send-report', (req, res) =>{
    generatePdf(req.body);
    res.redirect('/')
})
// router.post('/add-prescription', (req, res) => {
//     // console.log(req.body)

//     const {
//         pname,
//         pid,
//         med1,
//         des1,
//         tim1,
//         med2,
//         des2,
//         tim2,
//         med3,
//         des3,
//         tim3,
//         med4,
//         des4,
//         tim4,
//     } = req.body;

//     generatePdf(req.body);

//     var p = new Prescription({
//         image:
//             'https://image.shutterstock.com/image-vector/document-folder-stamp-text-isolated-260nw-1373751197.jpg',
//         doctor_name: currentUser.name,
//         doctor_id: currentUser.id,
//         user_name: pname,
//         user_id: req.body.patient_id,
//         service: pid,
//         appointment_id: req.body.appointment,
//         med1: med1,
//         des1: des1,
//         tim1: tim1,
//         med2: med2,
//         des2: des2,
//         tim2: tim2,
//         med3: med3,
//         des3: des3,
//         tim3: tim3,
//         med4: med4,
//         des4: des4,
//         tim4: tim4,
//     });

//     p.save()
//         .then((created) => {
//             Appointment.findByIdAndUpdate(req.body.appointment, {
//                 complete: true,
//             })
//                 .then((s) => {})
//                 .catch((err) => {
//                     console.log(err);
//                 });

//             console.log('prescription', created);
//             res.redirect('/hos-doctor-dash');
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

module.exports = router;
