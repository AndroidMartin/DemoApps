function convertLearningPathsReport() {
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
  sheet = ss.getActiveSheet();
  checkCols();
  var wasFormatted = false;

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
    alertColumnMisMatch();
  }
  return wasFormatted;
}


function formatLearningPathReport(){
  sheet = ss.getActiveSheet();
  startFormat(); // ToDo: move startFormat() to when formatting actually starts - replace with colCheck() here. --> Do this on all formatting scripts
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
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    Logger.log('Formatting range: ' + range.getA1Notation());

    formulaArray.push("=$E2");
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("#b7e1cd").setRanges([range]).build());

    for (i=0;i<rules.length;i++){
      addConditionalFormatRule(sheet,rules[i]);
    }
    cleanUp();
  } else {
    alertColumnMisMatch();
  }
}
