function convertAchievementsReport() {
  sheet = ss.getActiveSheet();
  if (alertConfirmConversion('Achievements') == "YES"){
    if (delColumnsAchievements() == false) {
      formatAchievementsReport();
    }
  } else {
    ss.toast(msgCancelledOperation);
  }
}

function delColumnsAchievements() {
  sheet = ss.getActiveSheet();
  checkCols();
  var wasFormatted = false;
  if (maxCol == 9) {
    if (alertAlreadyConverted() == "YES"){
      formatAchievementsReport();
      wasFormatted = true;
    } else {
      ss.toast(msgCancelledOperation);
      return;
    }
  } else if (lastCol == 22) {
    ss.toast(msgStartColDelete);
    sheet.deleteColumns(13,maxCol-12); // run delCols and change to (13,lastCol) ???
    sheet.deleteColumns(10,2);
    sheet.deleteColumn(5);
    cleanUp();
  } else {
    alertColumnMisMatch();
  }
  return wasFormatted;
}


function formatAchievementsReport(){
  sheet = ss.getActiveSheet();
  startFormat();
  var formulaArray = [];
  var rules = [];

  if (lastCol == 22) {
    if (alertNeedsConversion() == "YES") {
      delColumnsAchievements();
    } else {
      ss.toast(msgCancelledOperation);
      return;
    }
  }

  if (lastCol == 9) {
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    Logger.log('Formatting range: ' + range.getA1Notation());

    formulaArray.push("=$C2>TODAY()");
    formulaArray.push("=$C2>TODAY()-30");
    formulaArray.push("=$C2<TODAY()");
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("#b7e1cd").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("orange").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());

    for (i=0;i<rules.length;i++){
      addConditionalFormatRule(sheet,rules[i]);
    }
    cleanUp();
  } else {
    alertColumnMisMatch();
  }
}
