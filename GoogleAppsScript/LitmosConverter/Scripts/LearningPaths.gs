function convertLearningPathsReport() {
  Logger.log('Starting to run %s','convertLearningPathsReport');
  sheet = ss.getActiveSheet();

  if (alertConfirmConversion('Learning Path') == "YES"){
    if (delColumnsLearningPath() == false){
      formatLearningPathReport();
    }
  } else {
    ss.toast(msgCancelledOperation);
  }
}

function delColumnsLearningPath() {
  Logger.log('Starting to run %s','delColumnsLearningPath');
  sheet = ss.getActiveSheet();
  checkCols();
  var wasFormatted = false;  // Change to wasDeleted ???

  if (maxCol == 13) {
    if (alertAlreadyConverted() == "YES"){
      formatLearningPathReport();
      wasFormatted = true;
    } else {
      ss.toast(cancelledOperation);
      return;
    }
  } else if (lastCol == 28) {
    ss.toast(msgStartColDelete);
    sheet.deleteColumns(19,maxCol-18);
    sheet.deleteColumn(14);
    sheet.deleteColumn(12);
    sheet.deleteColumn(10);
    sheet.deleteColumns(5,2);
    sheet.hideColumns(2,2);
    sheet.hideColumns(9,1);
    sheet.getRange('F1').setValue('% Comp');
    cleanUp();
  } else {
    alertColumnMisMatch('13 or 28',lastCol,'delColumnsLearningPath');
  }
  return wasFormatted;
}


function formatLearningPathReport(){
  Logger.log('Starting to run %s','formatLearningPathReport');
  sheet = ss.getActiveSheet();
  checkCols();
  var formulaArray = [];
  var rules = [];

  if (lastCol == 28) {
    if (alertNeedsConversion() == "YES") {
      delColumnsLearningPath();
    } else {
      ss.toast(msgCancelledOperation);
      return;
    }
  }

  if (lastCol == 13){
    startFormat();
    var sortOrder = [{column: 6, ascending: false},1];
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    Logger.log('Formatting range: ' + range.getA1Notation());

    formulaArray.push('=$E2');
    formulaArray.push('=$F2>0');
    formulaArray.push('=$F2=0');
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("#b7e1cd").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("orange").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());

    for (i=0;i<rules.length;i++){
      addConditionalFormatRule(sheet,rules[i]);
    }
    cleanUp();
    sortReport(range,sortOrder);
  } else {
    alertColumnMisMatch('13 or 28',lastCol,'formatLearningPathReport');
  }
}
