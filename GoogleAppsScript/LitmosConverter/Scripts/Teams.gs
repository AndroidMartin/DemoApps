function convertTeamReport() {
  Logger.log('Starting to run %s','convertTeamReport');
  sheet = ss.getActiveSheet();
  if (alertConfirmConversion('Team') == "YES"){
    if (delColumnsTeams()){
      formatTeamReport();
    }
  }else {
    ss.toast(msgCancelledOperation);
  }
}


function delColumnsTeams() {
  Logger.log('Starting to run %s','delColumnsTeams');
  sheet = ss.getActiveSheet();
  checkCols();

  if (lastCol == 32) {
    ss.toast(msgStartColDelete);
    sheet.deleteColumns(23,maxCol-22);
    sheet.deleteColumn(19);
    sheet.deleteColumns(15,3);
    sheet.deleteColumns(10,2);
    sheet.hideColumns(2,2);
    sheet.getRange('J1').setValue('% Comp');
    cleanUp();
    return true;
  } else if (lastCol == 16) {
      if (alertAlreadyConverted() == "YES") {
        formatTeamReport();
      } else {
        ss.toast(msgCancelledOperation);
      }
  } else {
    alertColumnMisMatch('16 or 32',lastCol,'delColumnsTeams');
    return false;
  }
}

function formatTeamReport() {
  Logger.log('Starting to run %s','formatTeamReport');
  sheet = ss.getActiveSheet();
  checkCols();

  if (lastCol == 32) {
    if (alertNeedsConversion() == "YES") {
      var wasDeleted = delColumnsTeams();
      if (!wasDeleted) {
        ss.toast(msgCancelledOperation);
        return false;
      }
    } else {
      ss.toast(msgCancelledOperation);
      Logger.log('Cancelled formatting operation, conversion != "YES"');
      return false;
    }
  } else if (!(maxCol == 16)){
    alertColumnMisMatch('16 or 32',lastCol,'formatTeamReport');
    Logger.log('lastCol: ' + lastCol + ' - Need it to be 16. Aborting formatComplianceReport');
    return false;
  }

  if (maxCol == 16) {
    startFormat();
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,maxCol).getA1Notation());
    Logger.log(range);
    var formulaArray = [];
    formulaArray.push("=$M2=FALSE");
    formulaArray.push("=$K2=TRUE");
    formulaArray.push("=$G2>0");
    formulaArray.push("=$G2=0");
    //formulaArray.push("=$A2"); //for Checkboxes
    var rules = [];
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("black").setFontColor("white").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("#4adb8c").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("orange").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("red").setRanges([range]).build());
    //rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("lime").setRanges([range]).build());

    for (i=0;i<rules.length;i++){
      addConditionalFormatRule(sheet,rules[i]);
    }
    var sortOrder = [{column: 13, ascending: false},11,10];
    cleanUp();
    sortReport(range,sortOrder);
    return true;
  }
}

