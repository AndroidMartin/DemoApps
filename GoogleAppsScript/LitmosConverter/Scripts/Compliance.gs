function compReportSetup(expires,type){
  Logger.log('Starting to run %s','compReportSetup');
  sheet = ss.getActiveSheet();

  if (alertConfirmConversion('Compliance') == "YES"){
    var wasDeleted = delColumnsCompliance(expires,type);
    // if it was deleted, then format
    if (wasDeleted) {
      formatComplianceReport(expires,type);
    }
  }
}

function delColumnsCompliance(expires, type) {
  Logger.log('Starting to run %s','delColumnsCompliance'); // ToDo: Log start of every function
  sheet = ss.getActiveSheet();
  checkCols();

  if (lastCol == 12){
    ss.toast(msgStartColDelete);
    sheet.deleteColumns(12,maxCol-11);
    sheet.deleteColumns(5,3);
    sheet.hideColumns(2,2);
    sheet.getRange('E1').setValue('% Comp');
    cleanUp();
    return true;
  } else if (lastCol == 8 || lastCol == 10) { // ToDo: Update other scripts to follow same structure
    // column structure fine - format as RM or client?
    if (alertAlreadyConverted() == "YES") {
      formatComplianceReport(expires,type);  // ToDo: verify format exited correctly? - Checks in formatting provide adequate alerts?
    } else {
      ss.toast(msgCancelledOperation);
    }
  } else {
    alertColumnMisMatch('8, 10, or 12',lastCol,'delColumnsCompliance');
    return false;
  }
}

function formatComplianceReport(expires, type){
  Logger.log('Starting to run %s','formatComplianceReport');
  sheet = ss.getActiveSheet();
  checkCols();

  // Set 'expires' if not present
  if (expires == null) {
    expires = getExpires();
    if (expires == null){
      Logger.log("Format not applied, 'expires' is null.");
      ss.toast(msgCancelledOperation);
      // alertMissingInfo('Expiration status (true/false)');
      return false;
    }
  }
  // Set 'type' if not present
  if (type == null) {
    var isClient = promptClientOrRM();
    if (isClient == 'YES'){
      type = 'client';
    } else if (isClient == 'NO'){
      type = 'RM';
    } else {
      // User closed prompt for client or RM
      Logger.log("Format not applied, 'type' is null.");
      ss.toast(msgCancelledOperation);
      // alertMissingInfo('Audience (RM or client)');
      return false;
    }
  }

  // Check to see if the file needs to be converted first
  if (lastCol == 12) {
    if (alertNeedsConversion() == "YES") {
      var wasDeleted = delColumnsCompliance(expires,type);
      if (!(wasDeleted)){
        ss.toast(msgCancelledOperation);
        return false;
      }
    } else {
      ss.toast(msgCancelledOperation);
      Logger.log('Cancelled formatting operation, conversion != "YES"');
      return false;
    }
  } else if (!((lastCol == 8) || (lastCol == 10))){
    alertColumnMisMatch('8, 10, or 12',lastCol,'formatComplianceReport');
    Logger.log('lastCol: ' + lastCol + ' - Need it to be 8, 10, or 12. Aborting formatComplianceReport');
    return false;
  }


  // At this point, the script has exited if type and/or expires is null - formatting can begin!

  Logger.log('Formatting for %s, Expires: %s',type,expires);
  var formulaArray = [];
  var rules = [];
  var sortOrder = [];

  if (type == 'client'){  // --------------------------------------- CLIENT - CLIENT - CLIENT -------------
    // Test if checkboxes exist. If YES, remove them. Client(expires)
    if (testCheckBox()){
      if (alertLoseCheckboxes() == "YES"){
        sheet.deleteColumns(1,2);
      } else {
        ss.toast(msgCancelledOperation);
        return false;
      }
    }

    startFormat();
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    var hiddenColumns = [sheet.getRange(1,7),sheet.getRange(1,8)]; // Where does this get called?
    Logger.log('Formatting range: ' + range.getA1Notation());

    if (expires) { 
      sortOrder = [8,7,5,1]; // ToDo: Add sort order columns
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
    } else {
      sortOrder = [5,4,1]; // ToDo: Add sort order columns
      sheet.hideColumns(7,2);
      // Format Green for "Complete = TRUE" && RED for "Complete = FALSE" && Yellow for "has compliance date"
      formulaArray.push("=NOT(ISBLANK($G2))");
      formulaArray.push("=$F2");
      formulaArray.push("=NOT($F2)");
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("yellow").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("#4adb8c").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
    }

  } else if (type == 'RM'){  // --------------------------------------- RM - RM - RM - RM - RM -------------
    
    // Does the sheet have checkboxes? If NO, then add them. RM(expires)
    if (!testCheckBox()){
      sheet.insertColumnBefore(1);
      addCheckBoxes();
    }
    
    startFormat();
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    var hiddenColumns = [sheet.getRange(1,8),sheet.getRange(1,9),sheet.getRange(1,10)];
    Logger.log('Formatting range: ' + range.getA1Notation());

    // Set A1/B1 Formulas
    var a1Formula = '=B1-COUNTIF(A2:A,TRUE) + (COUNTIF(FILTER(A2:A,B2:B=FALSE,A2:A=TRUE),TRUE)*2) & "/" & B1 + COUNTIF(FILTER(A2:A,B2:B=FALSE,A2:A=TRUE),TRUE)';
    var b1Formula = '=COUNTIF(B2:B,TRUE)';
    var b2Formula;
    sheet.getRange("A1").setFormula(a1Formula); // sets A1 formula

    sortOrder = [{column: 2, ascending: false},3];  // Can change below based on 'expires'
    formulaArray.push('=$A2');
    formulaArray.push('=AND(NOT($H2),$G2=100)');
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("yellow").setRanges([range]).build());

    if (expires){
      // Format for expiring certs (w/ checkboxes)
      sortOrder = [{column: 2, ascending: false},8,6,7,5,1];
      b2Formula = '=OR(AND(INDIRECT("H"&ROW()),ISBLANK(INDIRECT("I"&ROW()))),AND(INDIRECT("H"&ROW()),NOT(INDIRECT("J"&ROW()))),AND(INDIRECT("I"&ROW())<TODAY()+31,INDIRECT("J"&ROW())))';
      formulaArray.push('=OR(AND($H2,ISBLANK($I2)),AND($H2,NOT($J2)))');
      formulaArray.push('=AND($I2<TODAY()+31,$J2)');
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("orange").setRanges([range]).build());
    } else {
      // Format for 0yr certs (w/ checkboxes)
      // sortOrder = [{column: 2, ascending: false},3]; // ToDo: Add sort order columns
      b2Formula = '=NOT(ISBLANK(INDIRECT("I"&ROW())))';
      formulaArray.push('=NOT(ISBLANK($I2))');
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
    }

    for (i=0;i<hiddenColumns.length;i++){
      sheet.unhideColumn(hiddenColumns[i]);
    }

    // Write Formulas
    var b1 = sheet.getRange(1,2);
    Logger.log('lastRow: %s, b1=%s',lastRow,b1);
    for (r=2;r<lastRow+1;r++){
      sheet.getRange(r,2).setFormula(b2Formula); // sets formula for column B (a1Formula needs this data!)
    }
    b1.setFormula(b1Formula); // sets B1 formula
    sheet.hideColumn(b1);

  } else if (type == 'hybrid'){   // -------------------------------------- HYBRID - HYBRID - HYBRID - HYBRID ---------------
    // Does the sheet have checkboxes? If NO, then add them.
    if (!testCheckBox()){
      sheet.insertColumnBefore(1);
      addCheckBoxes();
    }
    
    startFormat();
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    var hiddenColumns = [sheet.getRange(1,8),sheet.getRange(1,9),sheet.getRange(1,10)];
    Logger.log('Formatting range: ' + range.getA1Notation());

    // Set A1/B1 Formulas
    var a1Formula = '=B1-COUNTIF(A2:A,TRUE) + (COUNTIF(FILTER(A2:A,B2:B=FALSE,A2:A=TRUE),TRUE)*2) & "/" & B1 + COUNTIF(FILTER(A2:A,B2:B=FALSE,A2:A=TRUE),TRUE)';
    var b1Formula = '=COUNTIF(B2:B,TRUE)';
    var b2Formula;
    var highlight;
    sheet.getRange("A1").setFormula(a1Formula); // sets A1 formula

    if (expires){
      sortOrder = [3];  // ToDo: Add sort order columns
      b2Formula = '=OR(AND(INDIRECT("H"&ROW()),ISBLANK(INDIRECT("I"&ROW()))),AND(INDIRECT("H"&ROW()),NOT(INDIRECT("J"&ROW()))),AND(INDIRECT("I"&ROW())<TODAY()+31,INDIRECT("J"&ROW())))';
      formulaArray.push('=$A2'); // call from RM
      formulaArray.push('=OR(AND($H2,ISBLANK($I2)),AND($H2,NOT($J2)))'); // call from RM
      formulaArray.push('=AND($I2<TODAY()+30,$J2)'); // call from client + 1 column
      formulaArray.push('=$J2'); // call from client + 1 column
      formulaArray.push('=NOT($J2)'); // call from client + 1 column
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("yellow").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("orange").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("#4adb8c").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[4]).setBackground("red").setRanges([range]).build());
      for (i=0;i<hiddenColumns.length;i++){
        sheet.unhideColumn(hiddenColumns[i]);
      }
      highlight = 'yellow and orange';
    } else {
      sortOrder = [3];  // ToDo: Add sort order columns
      b2Formula = '=NOT(ISBLANK(INDIRECT("I"&ROW())))';
      formulaArray.push('=$A2'); // call from RM
      formulaArray.push('=OR(NOT(ISBLANK($I2)),AND(NOT($H2),$G2=100))'); // call from RM red & yellow
      formulaArray.push('=AND($G2>80,$G2<100)');
      formulaArray.push('=$H2'); // call from client + 1 column
      formulaArray.push('=NOT($H2)'); // call from client + 1 column
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("yellow").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("orange").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("#4adb8c").setRanges([range]).build());
      rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[4]).setBackground("red").setRanges([range]).build());
      sheet.hideColumns(9,2);
      highlight = 'yellow and possibly orange'; // ToDo: confirm orange needs resetting
    }

    // Splash message alerting RM which items to reset  - ToDo: create alert in Messages.gs
    ui.alert('RMs will need to check those employees highligted in ' + highlight + '.',ui.ButtonSet.OK);
    
    for (i=0;i<hiddenColumns.length;i++){
      sheet.unhideColumn(hiddenColumns[i]);
    }

    // Write Formulas
    var b1 = sheet.getRange(1,2);
    Logger.log('lastRow: %s, b1=%s',lastRow,b1);
    for (r=2;r<lastRow+1;r++){
      sheet.getRange(r,2).setFormula(b2Formula); // sets formula for column B (a1Formula needs this data!)
    }
    b1.setFormula(b1Formula); // sets B1 formula
    sheet.hideColumn(b1);
  }

  // Write Formatting Rules
  for (i=0;i<rules.length;i++){
      addConditionalFormatRule(sheet,rules[i]);
  }

  cleanUp();
  sortReport(range,sortOrder);
  return true;
}


function clientComplianceReport(){
  compReportSetup(true,'client');
}

function client0yrComplianceReport(){
  compReportSetup(false,'client');
}

function rmComplianceReport(){
  compReportSetup(true,'RM');
}

function rm0yrComplianceReport(){
  compReportSetup(false,'RM');
}

function hybridComplianceReport(){
  compReportSetup(null,'hybrid');
}

function formatComplianceReportClient(){
  formatComplianceReport(null,'client');
}

function formatComplianceReportRM(){
  formatComplianceReport(null,'RM');
}

function formatComplianceReportHybrid(){
    formatComplianceReport(null,'hybrid');
}
