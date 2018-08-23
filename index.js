let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let SettingsBills = require('./SettingsBills');
let moment = require('moment');
let flash = require('express-flash');
let session = require('express-session');

let app = express();
let settingsBill = SettingsBills();

function fancyTimeHandlebarsHelper(param, context) {
    return moment(param).fromNow();
}

app.use(session({
    secret: "bill",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main',
        helpers: {
            fancyTime: fancyTimeHandlebarsHelper,
        }
    }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    let call = settingsBill.getCall();
    let sms = settingsBill.getSms();
    let warning = settingsBill.getWarning();
    let critical = settingsBill.getCritical();

    let callCostType = settingsBill.callsFunction();
    let smsCostType = settingsBill.smssFunction();
    let totalCostType = settingsBill.totalFunction();

    let color = settingsBill.colorUpdate();
    console.log(color);

    res.render('index', {
        callCostType,
        smsCostType,
        totalCostType,
        call,
        sms,
        critical,
        warning,
        color
    });
});

app.post('/settings', function (req, res) {
    console.log(req.body);
    let call = req.body.callCost;
    let sms = req.body.smsCost;
    let warning = req.body.warningLevel;
    let critical = req.body.criticalLevel;

    settingsBill.callSets(call);
    settingsBill.smsSets(sms);
    settingsBill.warningSets(warning);
    settingsBill.criticalSets(critical);

    res.redirect('/');
})

app.post('/action', function (req, res) {
    settingsBill.billSettings(req.body.actionType);

    res.redirect('/')
})

app.get('/actions', function (req, res) {
    let totalAction = settingsBill.actionsReturn();
    res.render('actions', { actions: totalAction });
})

app.get('/actions/:billType', function (req, res) {
    let billAction = req.params.billType;
    let actions = settingsBill.actionsType(billAction);

    res.render('actions', { actions })
})

app.post('/reset', function (req, res) {
    settingsBill.reset();
    // req.flash('warning', 'All data cleared out!');
    res.redirect('/');
})

let PORT = process.env.PORT || 5050;

app.listen(PORT, function () {
    console.log('App running on port', PORT);
});
