function clientComplianceReport(){
  var expires = true;
  compReportSetup(expires,'client');
}

function client0yrComplianceReport(){
  var expires = false;
  compReportSetup(expires,'client');
}

function rmComplianceReport(){
  var expires = true;
  compReportSetup(expires,'RM');
}

function rm0yrComplianceReport(){
  var expires = false;
  compReportSetup(expires,'RM');
}

function compReportSetup(expires,type){
  sheet = ss.getActiveSheet();
  // ToDo: Check for column structure like 'Courses' to select appropriate function???
  if (alertConfirmConversion('Compliance') == "YES"){
    if (delColumnsCompliance(expires,type) == false){
      // Runs appropriate formatting
      if (type == 'RM') {
        formatComplianceReportRM(expires);
      } else if (type == 'client') {
        formatComplianceReportClient(expires);
      }
    }
  } else {
    ss.toast(msgCancelledOperation);
  }
}

function delColumnsCompliance(expires, type) {
  var wasFormatted = false;
  checkCols();

  // if (testCheckBox()){
  //   sheet.deleteColumn(1);
  //   checkCols();
  // }

  if (lastCol == 12){
    sheet.deleteColumns(12,maxCol-11);
    sheet.deleteColumns(5,3);
    sheet.hideColumns(2,2);
    sheet.getRange('E1').setValue('% Comp');
    cleanUp();
  } else if (lastCol == 8 || testCheckBox()) {
    // column structure fine - format as RM or client?
    if (alertAlreadyConverted() == "YES") {
      if (type == null) {
        // prompt for type
        var responseType = promptClientOrRM();
        if (responseType == "YES") {
          type = 'client';
        } else if (responseType == "NO"){
          type = 'RM';
        }
      }
      if (expires == null) {
        //ask if it expires
        var responseExpires = promptCertExpire();
        if (responseExpires == "YES"){
          expires = true;
        } else if (responseExpires == "NO"){
          expires = false;
        }
      }
      Logger.log(type + ' / ' + expires);
      if (type == 'RM'){
        formatComplianceReportRM(expires);
        Logger.log('Formatting for RM, Expires: ' + expires);
      } else if (type == 'client'){
        Logger.log('Formatting for client, Expires: ' + expires);
        formatComplianceReportClient(expires);
      } else {
        // ToDo: Add warning message that the type could not be found.
      }
    } else {
      ss.toast(msgCancelledOperation);
    }
    wasFormatted = true;
  } else {
    alertColumnMisMatch();
  }
  Logger.log('wasFormatted = ' + wasFormatted);
  return wasFormatted;
}

function formatComplianceReportClient(expires){
  // Does the cert expire?
  if (expires == null) {
    expires = getExpires();
  } if (expires == null){
    Logger.log("Format not applied, 'expires' is null.");
    ss.toast(msgCancelledOperation);
    return;
  }

  //ToDo: Add check to see if sheet needs to be converted first

  // Does the sheet have checkboxes? Yes=remove them
  if (testCheckBox()){
  // if (lastCol == 9){
    sheet.deleteColumn(1);
    lastCol--;
    maxCol--;
  }

  startFormat();
  var formulaArray = [];
  var rules = [];
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  var hiddenColumns = [sheet.getRange(1,7),sheet.getRange(1,8)];
  Logger.log('Formatting range: ' + range.getA1Notation());

  if (expires) {
    formulaArray.push("=AND($F2,$H2=FALSE)");
    formulaArray.push("=AND($G2<TODAY()+31,$H2)");
    formulaArray.push("=$H2");
    formulaArray.push("=$H2=FALSE");
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("yellow").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("orange").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("#4adb8c").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("red").setRanges([range]).build());
    for (i=0;i<hiddenColumns.length;i++){
      sheet.unhideColumn(hiddenColumns[i]);
    }
  } else if (!expires){
    sheet.hideColumns(7,2);
    // Format Green for "Complete = TRUE" && RED for "Complete = FALSE" && Yellow for "has compliance date"
    formulaArray.push("=NOT(ISBLANK($G2))");
    formulaArray.push("=$F2");
    formulaArray.push("=NOT($F2)");
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("yellow").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("#4adb8c").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
  }

  for (i=0;i<rules.length;i++){
    addConditionalFormatRule(sheet,rules[i]);
  }
  sortCompReport(expires);
}


function formatComplianceReportRM(expires){
  sheet = ss.getActiveSheet();
  // Does the cert expire?
  if (expires == null) {
    expires = getExpires();
  } if (expires == null){
    Logger.log("Format not applied, 'expires' is null.");
    ss.toast(msgCancelledOperation);
    return;
  }

  //ToDo: Add check to see if sheet needs to be converted first

  // Does the sheet have checkboxes? No=add them
  if (!testCheckBox()){
    addCheckBoxes();
    // ToDo: add A1 Formula
    lastCol++;
    maxCol++;
  }

  startFormat();
  var formulaArray = [];
  var rules = [];
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  var hiddenColumns = [sheet.getRange(1,7),sheet.getRange(1,8),sheet.getRange(1,9)];
  Logger.log('Formatting range: ' + range.getA1Notation());

  if (expires){
    // Format for expiring certs (w/ checkboxes)
    formulaArray.push("=$A2");
    formulaArray.push("=OR(AND($G2,ISBLANK($H2)),AND($G2,NOT($I2)),AND($H2<TODAY()+31,$I2))");
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("red").setRanges([range]).build());
  } else if (!expires){
    // Format for 0yr certs (w/ checkboxes)
    formulaArray.push("=$A2");
    formulaArray.push("=NOT(ISBLANK($H2))");
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("red").setRanges([range]).build());
  }

  for (i=0;i<rules.length;i++){
    addConditionalFormatRule(sheet,rules[i]);
  }
  for (i=0;i<hiddenColumns.length;i++){
    sheet.unhideColumn(hiddenColumns[i]);
  }
  sortCompReport(expires);
}

function formatComplianceReportHybrid(expires){  // Intended as dual-purpose for both RMs & client (hybrid) - needs work on expires true/false
  sheet = ss.getActiveSheet();
  // Does the cert expire?
  if (expires == null) {
    expires = getExpires();
    Logger.log('Expires: ' + expires);
    checkCols();
  } if (expires == null){
    Logger.log("Format not applied, 'expires' is null.");
    ss.toast(msgCancelledOperation);
    return;
  }

  // Check for proper column structure and address before moving on
  if (!lastCol == 13 || !lastCol == 8 || !lastCol == 9){  // if lastCol = 12 ???
    delColumnsCompliance();
  }
  
  if (lastCol == 13) {  // will it ever be 13 (checkboxes AND not deleted???)
    if (alertNeedsConversion() == 'YES'){
      sheet.deleteColumns(13,maxCol-12);
      sheet.deleteColumns(6,3);
      sheet.hideColumns(3,2);
      sheet.getRange('E1').setValue('% Comp');
      cleanUp();
    }
  }

  if ((lastCol == 8) || (lastCol == 9 && testCheckBox())){
    if (lastCol == 8) {
      addCheckBoxes();
      // ToDo: add A1 Formula
    }

    startFormat();
    var formulaArray = [];
    var rules = [];
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    var hiddenColumns = [sheet.getRange(1,8),sheet.getRange(1,9)];
    sheet.hideColumns(3,2);
    Logger.log('Formatting range: ' + range.getA1Notation());

    if (expires){
      // Format for expiring certs (w/ checkboxes) - ToDo: Change from below?
      formulaArray.push("=$A2");
      formulaArray.push("=AND($G2,NOT($I2))");
      formulaArray.push("=AND($H2<TODAY()+30,$I2)");
      formulaArray.push("=$I2");
      formulaArray.push("=NOT($I2)");
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("yellow").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("orange").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("#4adb8c").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[4]).setBackground("red").setRanges([range]).build());
      for (i=0;i<hiddenColumns.length;i++){
        sheet.unhideColumn(hiddenColumns[i]);
      }
    } else if (!expires){
      // Format for 0yr certs (w/ checkboxes) - ToDo: Change from above???
      formulaArray.push("=$C2");
      formulaArray.push("=AND($G2,NOT($I2))");
      formulaArray.push("=AND($H2<TODAY()+30,$I2)");
      formulaArray.push("=$I2");
      formulaArray.push("=NOT($I2)");
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("yellow").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("orange").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("#4adb8c").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[4]).setBackground("red").setRanges([range]).build());
      sheet.hideColumns(8,2);
    }
    sortCompReport(expires);
  }
  for (i=0;i<rules.length;i++){
    addConditionalFormatRule(sheet,rules[i]);
  }
  Logger.log('%s rules being applied: %s',rules.length,formulaArray);
}


function sortCompReport(expires){
  // ToDo: Verify sort order - Make one for each 'type' && 'expires' && hasCheckBoxes???
  checkCols();
  checkRows();
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  if (expires){
    range.sort([8,7,5,1]);
  } else if (!expires){
    range.sort([5,4,1]);
  }
}

// ----------------------------------------




