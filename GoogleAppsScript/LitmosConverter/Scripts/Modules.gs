function convertModulesReportSpec() {
  sheet = ss.getActiveSheet();
  checkCols();
  var wasDeleted;

  if (alertConfirmConversion('Specific Module') == "YES"){
    if (lastCol == 16) {
      wasDeleted = delColumnsModulesSpec();
      if (wasDeleted){
        formatModulesReportSpec();
      } else {
        ss.toast(msgCancelledOperation);
      }
    } if (lastCol == 11) {
      if (alertAlreadyConverted() == "YES") {
        formatModulesReportSpec();
      } else {
        ss.toast(msgCancelledOperation);
      }
    } else {
      alertColumnMisMatch('11 or 16',lastCol,'convertModulesReportSpec');
    }
  } else {
    ss.toast(msgCancelledOperation);
  }
}

function convertModulesReportALL() {
  sheet = ss.getActiveSheet();
  checkCols();

  if (alertConfirmConversion('All Modules') == "YES"){
    if (delColumnsModules()){
      formatModulesReportALL();
    } else {
      ss.toast(msgCancelledOperation);
    }
  } else {
    ss.toast(msgCancelledOperation);
  }
}


//     if (lastCol == 6){
//       if (alertAlreadyConverted() == "YES"){
//         formatModulesReportALL();
//       } else {
//         ss.toast(msgCancelledOperation);
//       }
//     } else if (maxCol == 7) {
//       if (delColumnsModules()){
//         formatModulesReportALL();
//       } else {
//         ss.toast(msgCancelledOperation);
//       }
//     } else {
//       alertColumnMisMatch('6 or 7',lastCol,'convertModulesReportAll');
//     }
//   } else {
//     ss.toast(msgCancelledOperation);
//   }
// }

//   if (maxCol == 11){
//     if (alertAlreadyConverted() == "YES"){
//       formatModulesReportSpec();
//     } else {
//       ss.toast(msgCancelledOperation);
//     }
//   } else if (lastCol == 16){
//     if (alertConfirmConversion('Specific Module') == "YES"){
//       delColumnsModules();
//       formatModulesReportSpec();
//     } else {
//       ss.toast(msgCancelledOperation);
//     }
//   } else {
//     alertColumnMisMatch('11 or 16',lastCol,'convertModulesReportSpec');
//   }
// }

  // if (maxCol == 6){
  //   if (alertAlreadyConverted() == "YES"){
  //     formatModulesReportALL();
  //   } else {
  //     ss.toast(msgCancelledOperation);
  //   }
  // } else if (lastCol == 7){
  //   if (alertConfirmConversion('All Modules') == "YES"){
  //     delColumnsModules();
  //     formatModulesReportALL();
  //   } else{
  //     ss.toast(msgCancelledOperation);
  //   }
  // } else {
  //   alertColumnMisMatch('6 or 7',lastCol,'convertModulesReportALL');
  // }
// }



//   } else if (lastCol == 11){
//     if (alertAlreadyConverted() == "YES"){
//       formatModulesReportSpec();
//     } else {
//       ss.toast(msgCancelledOperation);
//     }
//   } else {
//     alertColumnMisMatch('16 or 11',lastCol,'delColumnsModulesSpec');
//     return false;
//   }
// }

function delColumnsModules() { // CORRECT
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

  // if (lastCol == 16){
  //   delColumnsModulesSpec();
  // } else if (lastCol == 7){
  //   delColumnsModulesALL();
  // } else {
  //   alertColumnMisMatch('11 or 16',lastCol,'delColumnsModules');
  // }
  // cleanUp();
}

function formatModulesReportALL(){
  sheet = ss.getActiveSheet();
  checkCols();
  checkRows();
  if (!(lastCol == 6)){
    if (alertNeedsConversion() == "YES") {
      delColumnsModules();
    }
  }

  if (!(lastCol == 6)){
    ss.toast(msgCancelledOperation); // Should this be an alert instead???
    return;
  }

  // At this point, the sheet has been properly converted
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  var formulaArray = [];
  var rules = [];
  var sortOrder = null; // ToDo: Add sorting order - 5,false
  startFormat();
  // ToDo: Add formatting rules
  formulaArray.push('=$E2=100');
  formulaArray.push('=$E2>0');
  formulaArray.push('=$E2=0');
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("#b7e1cd").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("orange").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());

  for (i=0;i<rules.length;i++){
    addConditionalFormatRule(sheet,rules[i]);
  }

  cleanUp();
  sortReport(range,sortOrder);
}

function formatModulesReportSpec(){
  functionTBD();
  return;
  sheet = ss.getActiveSheet();
  startFormat();
  // ToDo: Add formatting rules
  cleanUp();
  sortReport(range,sortOrder);

}

function delColumnsModulesALL() {
  ss.toast(msgStartColDelete);
  sheet.deleteColumns(8,maxCol-7);
  sheet.deleteColumn(5);
  sheet.getRange('E1').setValue('% Comp');
  return true;
}

function delColumnsModulesSpec() {
  ss.toast(msgStartColDelete);
  sheet.deleteColumns(14,maxCol-13);
  sheet.deleteColumn(9);
  sheet.deleteColumn(7);
  sheet.hideColumns(2,2);
  return true;
}
