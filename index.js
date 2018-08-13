let express = require('express');
let exphbs = require('express-handlebars');
let bodyParser = require('body-parser');
let SettingsBills = require('./SettingsBills');


let app = express();
let settingsBill = SettingsBills();

app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
    let call = settingsBill.getCall();;
    let sms = settingsBill.getSms();;
    let warning = settingsBill.getWarning();;
    let critical = settingsBill.getCritical();;

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

app.post('/settings', function(req, res){

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

app.post('/action', function(req, res){
    settingsBill.billSettings(req.body.actionType);
    let color = settingsBill.colorUpdate();
    console.log(color);
    
    res.redirect('/')
})

app.get('/actions', function(req,res){
    res.render('actions', {actions : settingsBill.actionsReturn()});
})

app.get('/actions/:billType', function(req, res){
    let billAction = req.params.billType;
    res.render('actions', {actions : settingsBill.actionsType(billAction)});
})

let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
    console.log('App running on port', PORT);
});
