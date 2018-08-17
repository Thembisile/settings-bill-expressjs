module.exports = function () {

  var call;
  var sms;
  var warning;
  var critical;

  var calls = 0;
  var smss = 0;
  var total = 0;

  let list = [];
  let color = '';

  function callsFunction() {
    return calls.toFixed(2);
  }

  function smssFunction() {
    return smss.toFixed(2);
  }

  function totalFunction() {
    var total = calls + smss;
    return total.toFixed(2);
  }

  function warningSets(warningSet) {
    warning = parseFloat(warningSet);
  }

  function getWarning() {
    return warning;
  }

  function criticalSets(criticalSet) {
    critical = parseFloat(criticalSet);
  }

  function getCritical() {
    return critical;
  }

  function callSets(callSet) {
    call = parseFloat(callSet);
  }

  function getCall() {
    return call;
  }

  function smsSets(smsSet) {
    sms = parseFloat(smsSet);
  }

  function getSms() {
    return sms;
  }

  function billSettings(costType) {
    let billCost = 0;
    let billTypeSet = costType;

    if (total >= critical) {
      return;
    }

    if (billTypeSet === 'SMS') {
      smss += sms;
      billCost += sms;
    }
    if (billTypeSet === 'Call') {
      calls += call;
      billCost += call;
    }

    list.push({
      type: billTypeSet,
      cost: billCost,
      time: new Date
    })

    return total = smss + calls;
  }

  function actionsReturn() {

    return list;
  }

  function colorUpdate() {

    if (total >= critical) {
      color = 'danger';
      return color;
    }
    if (total >= warning) {
      color = 'warning';
      return color;
    }
    console.log(color);
  }

  function actionsType(billType) {
    return list.filter((bill) => bill.type === billType);
  }

  function reset(){
    calls = 0;
    smss = 0;
    total = 0;
  }

  function notification(){
    if (total >= critical) {
      notify = 'danger';
      return;
    }
  }

  return {
    warningSets,
    criticalSets,
    callSets,
    smsSets,
    billSettings,
    callsFunction,
    smssFunction,
    totalFunction,
    colorUpdate,
    getCall,
    getCritical,
    getWarning,
    getSms,
    actionsReturn,
    actionsType,
    reset,
    notification
  }
}
