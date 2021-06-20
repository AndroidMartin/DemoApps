function convertAssessmentsReportALL() {
  sheet = ss.getActiveSheet();
  checkCols();
  if (maxCol == 6){
    if (alertAlreadyConverted() == "YES"){
      formatAssessmentsReportALL();
    } else {
      ss.toast(msgCancelledOperation);
    }
  } else if (lastCol == 7){
    if (alertConfirmConversion('All Assessments') == "YES"){
      if (delColumnsAssessments()){
        formatAssessmentsReportALL();
      }
    } else{
      ss.toast(msgCancelledOperation);
    }
  } else {
    alertColumnMisMatch('6 or 7',lastCol,'convertAssessmentsReportALL');
  }
}

function convertAssessmentsReportSpec() {
  sheet = ss.getActiveSheet();
  checkCols();
  if (maxCol == 11){
    if (alertAlreadyConverted() == "YES"){
      formatAssessmentsReportSpec();
    } else {
      ss.toast(msgCancelledOperation);
    }
  } else if (lastCol == 16){
    if (alertConfirmConversion('Specific Assessment') == "YES"){
      if (delColumnsAssessments()) {
        formatAssessmentsReportSpec();
      }
    } else {
      ss.toast(cancelledOperation);
    }
  } else {
    alertColumnMisMatch('11 or 16',lastCol,'convertAssessmentsReportSpec');
  }
}

function delColumnsAssessments() {
  sheet = ss.getActiveSheet();
  checkCols();
  var wasDeleted = false;
  if (lastCol == 16){
    wasDeleted = delColumnsAssessmentsSpec();
  } else if (lastCol == 7){
    wasDeleted = delColumnsAssessmentsALL();
  } else {
    alertColumnMisMatch('7 or 16',lastCol,'delColumnsAssessments');
  }
  if (wasDeleted) {
    cleanUp();
  }
  return wasDeleted;
}

function delColumnsAssessmentsALL() {
  ss.toast(msgStartColDelete);
  sheet = ss.getActiveSheet();
  checkCols();
  
  sheet.deleteColumns(8,maxCol-7);
  sheet.deleteColumn(5);
  sheet.deleteColumn(3);
  sheet.getRange('D1').setValue('% Comp');
  return true;
}

function delColumnsAssessmentsSpec() {
  ss.toast(msgStartColDelete);
  sheet.deleteColumns(14,maxCol-13);
  sheet.deleteColumn(9);
  sheet.deleteColumn(7);
  sheet.hideColumns(2,2);
  return true;
}


function formatAssessmentsReportALL(){
  functionTBD();
  startFormat();
  return;
  sheet = ss.getActiveSheet();
  // ToDo: Add formatting rules
  cleanUp();
  sortReport(range,sortOrder);
}

function formatAssessmentsReportSpec(){
  functionTBD();
  startFormat();
  return;
  sheet = ss.getActiveSheet();
  // ToDo: Add formatting rules
  cleanUp();
  sortReport(range,sortOrder);
}
