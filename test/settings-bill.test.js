let SettingsBills = require('../SettingsBills.js');
let assert = require('assert');

describe('SettingsBills', function(){
  it('should take any number to update the call cost', function(){
    var callCostSet = SettingsBills();

    callCostSet.callSets(5);

    assert.equal(5 , callCostSet.getCall());
  })
  it('should take any number to update sms cost', function(){
    var smsCostSet = SettingsBills();

    smsCostSet.smsSets(2.5);

    var smsCostSet2 = SettingsBills();

    smsCostSet2.smsSets(2);

    assert.equal(2.5, smsCostSet.getSms());
    assert.equal(2, smsCostSet2.getSms());
  })
  it('should take any number to update the warning level', function(){
    var warningSetting = SettingsBills();

    warningSetting.warningSets(2);

    var warningSetting1 = SettingsBills();

    warningSetting1.warningSets(15.5);

    var warningSetting2 = SettingsBills();

    warningSetting2.warningSets(2000);

    assert.equal(2, warningSetting.getWarning());
    assert.equal(15.5, warningSetting1.getWarning());
    assert.equal(2000, warningSetting2.getWarning());
  })
  it('should take any number to update critical level', function(){
    var criticalSetting = SettingsBills();

    criticalSetting.criticalSets(80.5);

    var criticalSetting1 = SettingsBills();

    criticalSetting1.criticalSets(100);

    assert.equal(80.5, criticalSetting.getCritical());
    assert.equal(100, criticalSetting1.getCritical());
  })
  it('should return the total amount of calls', function(){
    var callBill = SettingsBills();

    callBill.billSettings('call');
    callBill.billSettings('call');

    assert.equal('0.00', callBill.callsFunction());
  })
  it('should return the total amount of sms', function(){
    var smsBill = SettingsBills();

    smsBill.billSettings('sms');
    smsBill.billSettings('sms');
    smsBill.billSettings('sms');

    assert.equal('0.00', smsBill.smssFunction());
  })
  it('should return the total amount for both calls and sms', function(){
    var totalBill = SettingsBills();

    totalBill.billSettings('sms');
    totalBill.billSettings('call')
    totalBill.billSettings('call')
    totalBill.billSettings('call')

    assert.equal('0.00', totalBill.totalFunction());
  })
})
