function convertPeopleReport() {
  Logger.log('Starting to run %s','convertPeopleReport');
  sheet = ss.getActiveSheet();
  if (alertConfirmConversion('People') == "YES"){
    var wasDeleted = delColumnsPeople();
    if (wasDeleted){
      formatPeopleReport();
    } else if (wasDeleted == null){ // if null, there was an error during formatting
      ss.toast(msgCancelledOperation);
    }
  }else {
    ss.toast(msgCancelledOperation);
  }
}

function delColumnsPeople() {
  Logger.log('Starting to run %s','delColumnsPeople');
  sheet = ss.getActiveSheet();
  checkCols();

  if (lastCol == 51) {
    ss.toast(msgStartColDelete);
    sheet.deleteColumns(51,maxCol-50);
    sheet.deleteColumns(47,3);
    sheet.deleteColumns(44,2);
    sheet.deleteColumns(32,3);
    sheet.deleteColumn(25);
    sheet.deleteColumns(21,3);
    sheet.deleteColumn(18);
    sheet.deleteColumns(7,10);
    sheet.hideColumns(3,2);
    sheet.hideColumns(17,5);
    sheet.hideColumns(24,2);
    sheet.getRange('J1').setValue('% Comp');
    cleanUp();
    return true;
  } else if (lastCol == 27) {
    if (alertAlreadyConverted() == "YES") {
      formatPeopleReport();
    } else {
      ss.toast(msgCancelledOperation);
    }
  } else {
    alertColumnMisMatch('27 or 51',lastCol,'delColumnsPeople');
    return false;
  }
}

function formatPeopleReport(){
  Logger.log('Starting to run %s','formatPeopleReport');
  sheet = ss.getActiveSheet();
  checkCols();
  var formulaArray = [];
  var rules = [];

  if (lastCol == 51) {
    if (alertNeedsConversion() == "YES") {
      delColumnsPeople();
    } else {
      ss.toast(msgCancelledOperation);
      return;
    }
  }

  if (lastCol == 27){
    startFormat();
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    Logger.log('Formatting range: ' + range.getA1Notation());

    // //ToDo: add formatting rules
    formulaArray.push('=$I2=FALSE'); // For finding inactive users
    formulaArray.push('=$N2>0');
    formulaArray.push('=OR($J2=100,$J2=50)');
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("black").setFontColor("white").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("orange").setRanges([range]).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("#4adb8c").setRanges([range]).build());

    for (i=0;i<rules.length;i++){
      addConditionalFormatRule(sheet,rules[i]);
    }
    var sortOrder = [{column: 9, ascending: false},{column: 10, ascending: false},16,1];
    cleanUp();
    sortReport(range,sortOrder);
    return true;
  } else {
    alertColumnMisMatch('27 or 51',lastCol,'formatPeopleReport');
    return false;
  }
}

// --- FUNCTIONS TO CONVERT FOR BULK-UPLOAD CORRECTIONS ---
function convertPeopleForBulkUpload(){
  Logger.log('Starting to run %s','convertPeopleForBulkUpload');
  sheet = ss.getActiveSheet();
  checkCols();
  //ToDo: Check for position of lastCol and suggest report type to format from

  if (alertConfirmConversion('People') == "YES"){
    if (lastCol == 51){
      ss.toast(msgStartColDelete);
      sheet.hideColumns(19,1);
      sheet.deleteColumns(47,maxCol-46);
      sheet.deleteColumns(44,2);
      sheet.deleteColumns(29,6);
      sheet.deleteColumns(21,4);
      sheet.deleteColumn(18);
      sheet.deleteColumns(7,10);
      sheet.deleteColumn(1);
      // Start modifying structure to better match upload template
      // ToDo: Make option to format if the column structure was already adjusted to the above (lastRow == 23)
      sheet.insertColumnBefore(5); // Add column for TeamCode - ToDo: Add column with dropdown list to select course and auto-fill course code
      sheet.getRange(1,5).setValue('TeamCode');
      sheet.getRange('M1').setValue('Current Team(s)');
      sheet.moveColumns(sheet.getRange('M1'),6);
      sheet.moveColumns(sheet.getRange(1,19,1,2),11);
      // Update table structure
      checkRows();
      checkCols();
      // lowerCase(1); // do you want to adjust usernames???
      correctEmails(4);
      titleCase(2);
      titleCase(3);
      titleCase(17);
      // ToDo: Format to highlight inactive employees (col 9 -> black w/ white text)
      // ToDo: Format col 1-5 to be yellow if empty
      // ToDo: Format to highlight team leaders if(col 23 == 4){} -> blue)
    } else {
      alertColumnMisMatch('51',lastCol,'convertPeopleForBulkUpload');
      return;
    }
    cleanUp();
  } else {
    ss.toast(msgCancelledOperation);
  }
}

function correctEmails(col){
  Logger.log('Starting to run %s','correctEmails');
  checkRows();
  var textOrg = sheet.getRange(2,col,maxRow-1).getValues();
  for (i=0;i<textOrg.length;i++){
    var t = textOrg[0,i].toString().toLowerCase();
    if (/\s/g.test(t)){
      Logger.log('Found incorrect email at row %s: ' + t,i+2);  // ToDo: console output number of emails corrected
      sheet.getRange(i+2,col).setFontColor('red').setFontWeight('bold');
    }
    textOrg[i][0] = t.replace(/\s/g,''); // Deletes empty spaces
    // ToDo: check there is an '@' symbol https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes
  }
  sheet.getRange(2,col,maxRow-1).setValues(textOrg);
}

function titleCase(col) {
  Logger.log('Starting to run %s','titleCase');
  checkRows();
  var textOrg = sheet.getRange(2,col,maxRow-1).getValues();
  for (i=0;i<textOrg.length;i++){
    var t = textOrg[0,i].toString();
    textOrg[i][0] = t.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();});
  }
  sheet.getRange(2,col,maxRow-1).setValues(textOrg);
}


//-------------------------------------------

function formatForUpload() {
  Logger.log('Starting to run %s','formatForUpload');
  sheet = ss.getActiveSheet();
  checkCols();
  var sortOrder = null; // ToDo: add sorting order
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  var reportType;
  var msgReportType = 'This is a %s report and is%s ready to be formatted'
  if (lastCol == 23){
    startFormat(); // Do you need to format???
    reportType = ['PEOPLE',''];
    sortReport(range,sortOrder);
  } else if (lastCol == 51){
    startFormat(); // Do you need to format???
    reportType = ['PEOPLE',' NOT'];
    // Ask to run adjust column structure (NOTE: different than delColumnsPeople)
    sortReport(range,sortOrder);
  } else {
    alertColumnMisMatch('23 or 51',lastCol,'formatForUpload');
    Logger.log('Did not formatForUpload as the column structure is NOT an expected format');
    return;
  }
  Logger.log(msgReportType,reportType[0],reportType[1]);
}


function lowerCase(col) {
  checkRows();
  var textOrg = sheet.getRange(2,col,maxRow-1).getValues();
  for (i=0;i<textOrg.length;i++){
    t = textOrg[0,i].toString().toLowerCase();
    textOrg[i][0] = t;
 }
  sheet.getRange(2,col,maxRow-1).setValues(textOrg);
}
