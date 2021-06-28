function convertModulesReportSpec() {
  Logger.log('Starting to run %s','convertModulesReportSpec');
  convertModulesReport('Specific');
}

function convertModulesReportALL() {
  Logger.log('Starting to run %s','convertModulesReportALL');
  convertModulesReport('ALL');
}

function convertModulesReport(type) {
  Logger.log('Starting to run %s','convertModulesReport');
  sheet = ss.getActiveSheet();
  checkCols();

  if (alertConfirmConversion('Modules') == "YES"){
    if (delColumnsModules()){
      if (type = 'ALL'){
        formatModulesReportALL();
      } else if (type = 'Specific'){
        formatModulesReportSpec();
      } else {
        alertTypeUndefined('modules');
        ss.toast(msgCancelledOperation);
      }
    } else {
      ss.toast(msgCancelledOperation);
    }
  } else {
    ss.toast(msgCancelledOperation);
  }
}

function delColumnsModules() {
  Logger.log('Starting to run %s','delColumnsModules');
  sheet = ss.getActiveSheet();
  var wasDeleted = false;
  checkCols();

  if (lastCol == 11 || lastCol == 6){
    if (alertAlreadyConverted() == "YES"){
      if (lastCol == 6){
        formatModulesReportALL();
      } else {
        formatModulesReportSpec();
      }
    } else {
      ss.toast(msgCancelledOperation);
    }
  } else if (lastCol == 16){
    wasDeleted = delColumnsModulesSpec();
  } else if (lastCol == 7){
    wasDeleted = delColumnsModulesALL();
  } else {
    alertColumnMisMatch('7 or 16',lastCol,'delColumnsModules');
  }

  if (wasDeleted) {
    cleanUp();
  }
  return wasDeleted;
}

function formatModulesReportALL(){
  Logger.log('Starting to run %s','formatModulesReportALL');
  sheet = ss.getActiveSheet();
  checkCols();
  checkRows();

  if (lastCol == 16 || lastCol == 7){
    if (alertNeedsConversion() == "YES") {
      delColumnsModules();
    }
  } else if (lastCol == 11) {
    if (alertSwap('a SPECIFIC Modules') == "OK"){
      Logger.log('Swapping to Specific module');
      formatModulesReportSpec();
      return;
    } else {
      ss.toast(msgCancelledOperation);
      return;
    }
  }

  if (!(lastCol == 6)){
    alertColumnMisMatch('6',lastCol,'formatModulesReportSpec');
    return;
  }

  // At this point, the sheet has been properly converted
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  var formulaArray = [];
  var rules = [];
  var sortOrder = [2,{column: 5, ascending: false}];
  startFormat();
  // Formatting rules
  formulaArray.push('=$E2=100');
  formulaArray.push('=$E2>0');
  formulaArray.push('=$E2=0');
  formulaArray.push('=ROW()=1');
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("#b7e1cd").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("orange").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
  var range1 = sheet.getRange(sheet.getRange(1,1,1,lastCol).getA1Notation()); // Formatting for first row - ToDo: add somewhere else to be called and added?
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("magenta").setRanges([range1]).build());

  for (i=0;i<rules.length;i++){
    addConditionalFormatRule(sheet,rules[i]);
  }

  cleanUp();
  sortReport(range,sortOrder);
}

function formatModulesReportSpec(){
  Logger.log('Starting to run %s','formatModulesReportSpec');
  sheet = ss.getActiveSheet();
  checkCols();
  checkRows();

  if (lastCol == 16 || lastCol == 7){
    if (alertNeedsConversion() == "YES") {
      delColumnsModules();
    }
  } else if (lastCol == 6) {
    if (alertSwap('an ALL Modules') == "OK"){
      formatModulesReportALL();
      return;
    } else {
      ss.toast(msgCancelledOperation);
      return;
    }
  }
  
  if (!(lastCol == 11)){
    alertColumnMisMatch('11',lastCol,'formatModulesReportSpec');
    return;
  }

  // At this point, the sheet has been properly converted
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  var formulaArray = [];
  var rules = [];
  var sortOrder = [7,{column: 8, ascending: false},9,1];
  startFormat();

  // Formatting rules
  formulaArray.push('=$H2');
  formulaArray.push('=$I2="In Progress"');
  formulaArray.push('=$I2="Failed"');
  formulaArray.push('=$G2');
  formulaArray.push('=ROW()=1');
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("#b7e1cd").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("orange").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("black").setFontColor("white").setRanges([range]).build());
  var range1 = sheet.getRange(sheet.getRange(1,1,1,lastCol).getA1Notation()); // Formatting for first row - ToDo: add somewhere else to be called and added?
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[4]).setBackground("magenta").setRanges([range1]).build());

  for (i=0;i<rules.length;i++){
    addConditionalFormatRule(sheet,rules[i]);
  }

  cleanUp();
  sortReport(range,sortOrder);
}

function delColumnsModulesALL() {
  Logger.log('Starting to run %s','delColumnsModulesAll');
  ss.toast(msgStartColDelete);
  sheet.deleteColumns(8,maxCol-7);
  sheet.deleteColumn(5);
  sheet.getRange('E1').setValue('% Comp');
  return true;
}

function delColumnsModulesSpec() {
  Logger.log('Starting to run %s','delColumnsModulesSpec');
  ss.toast(msgStartColDelete);
  sheet.deleteColumns(14,maxCol-13);
  sheet.deleteColumn(9);
  sheet.deleteColumn(7);
  sheet.hideColumns(2,2);
  return true;
}
