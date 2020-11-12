var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    flash = require('connect-flash');
var localStorage = require('localStorage'),
    jwt_decode = require('jwt-decode'),
    setAuthToken = require('./public/utils/setAuthToken');

    var schedule = require('node-schedule');
    const scheduler = require("./scheduler");

//Requiring routes
var indexRoutes = require('./routes/index'),
    authRoutes = require('./routes/auth'),
    scheduleRoute = require('./routes/schedule'),
    chatbot = require('./routes/chatbot'),
    prescription = require('./routes/prescription'),
    report = require('./routes/report');
const Hospital = require('./models/Hospital'),
    HospitalRoute = require('./routes/hospital'),
    AppRoute = require('./routes/appointment'),

    doctorRoutes = require('./routes/doctor'),

    patientSeed = require('./routes/patient_seed');

    app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// app.use(methodOverride("_method"));
app.use(flash());

app.use(
    require('express-session')({
        secret: 'news app!!!',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(function (req, res, next) {
    res.locals.currentUser;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(prescription);
app.use(report);
app.use("/auth",authRoutes);
app.use("/chatbot",chatbot)
app.use("/schedule",scheduleRoute)
app.use("/hospital",HospitalRoute)
app.use("/appointment",AppRoute)
app.use("/doctor",doctorRoutes)



if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    currentUser = decoded;

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Remove token from localStorage
        localStorage.removeItem('jwtToken');
        // Remove auth header for future requests
        setAuthToken(false);

        currentUser = null;
    }
}

app.listen(process.env.PORT || 8000, function () {
    console.log('News Admin panel has started');
});

let startTime = new Date(Date.now());
var j = schedule.scheduleJob({ start: startTime, rule: '*/30 * * * * *' }, function(){
    console.log("a")
    scheduler();
});