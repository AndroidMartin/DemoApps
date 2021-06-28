var msgCancelledOperation = 'The operation has been cancelled!';
var msgStartColDelete = 'Adjusting column structure...';
var msgStartFormat = 'Conditional formatting being applied...';
var msgSortReport = 'Sorting Report...';

function alertColumnMisMatch(colExpected,colActual,where) { // ToDo: add fields to pass in expected and actual column count?
  var fun = '\nWas expecting ' + colExpected + ' columns - you have ' + colActual + '.\nDev Notes: [' + where +']';
  if (where == null){
    fun = '';
  }
  ui.alert("⚠️ Column Mismatch",'Your column structure does NOT match what is expected for this type of report and the operation has been cancelled!  Please confirm that you have the correct report selected before attempting the operation again.' + fun,SpreadsheetApp.getUi().ButtonSet.OK);
}

function alertAlreadyConverted() {
  var response = ui.alert("Looks like the column structure has already been converted.  Would you like to format the sheet instead?",ui.ButtonSet.YES_NO);
  Logger.log('Want to format sheet: ' + response);
  // ToDo: add if statement to show msgOperationCancelled in alerts if response != "YES"
  return response;
}

function alertNeedsConversion() {
  var response = ui.alert("⚠️ Adjust Columns",'Your total number of columns indicates this report still needs to be converted before formatting can be applied. \nWould you like to convert the sheet now?',SpreadsheetApp.getUi().ButtonSet.YES_NO);
  Logger.log('Want to convert sheet: ' + response);
  return response;
}

function alertLoseCheckboxes(){
  var response = ui.alert("⚠️ Change Formatting",'It seems you have previously added checkboxes. If you continue, you will lose all checked boxes! \nWould you like to proceed anyway?',SpreadsheetApp.getUi().ButtonSet.YES_NO);
  Logger.log('Want to convert sheet: ' + response);
  return response;
}

function alertSortFailed(){
  var response = ui.alert('⚠️ Sorting Failed','A proper sorting order was not established.',SpreadsheetApp.getUi().ButtonSet.OK);
  return response;
}

function alertSwap(report){
  var response = ui.alert('⚠️ Check Report Type','It appears this report is actually ' + report + ' report. Would you like to format for that type instead?',SpreadsheetApp.getUi().ButtonSet.OK);
  return response;
}

function alertClearSheet(){
  var response = ui.alert('⚠️ Are you SURE you want to DELETE EVERYTHING on this sheet?!',ui.ButtonSet.YES_NO);
  return response;
}

function alertNewProject(){
  var response = ui.alert('⚠️ Are you SURE you want to create a new project?! This will DELETE EVERYTHING, including all other tabs.\n\nMake sure to save a copy of the last project you were working on!!!',ui.ButtonSet.YES_NO);
  return response;
}

function alertConfirmConversion(type){
  var sheetName = sheet.getName();
  var prefix;
  var firstLetter = "";
  firstLetter = type.substring(0,1);
  firstLetter = firstLetter.toUpperCase();
  if (firstLetter == "A" || firstLetter == "E" || firstLetter == "I" || firstLetter == "O" || firstLetter == "U") {
    prefix ='an "';
  } else {
    prefix = 'a "';
  }
  var report = prefix + type + ' Report"';
  var response = ui.alert('⚠️ Are You Sure?','Confirm "' + sheetName + '" is ' + report + ' in nature?\nNOTE: The changes made will be difficult to undo.',ui.ButtonSet.YES_NO);
  Logger.log('Is the report of correct type: ' + response);
  return response;
}

function alertTypeUndefined(type){
  var response = ui.alert('⚠️ Report Type Undefined','Cannot determine if this report is for a specific ' + type + ' or full ' + type + 'report.\nThe operation has been cancelled.',SpreadsheetApp.getUi().ButtonSet.OK);  // ToDo: find language for 'Full' report in Litmos
  return response;
}

function alertResetKey(colors){  // ToDo: Call this for each report
  ui.alert('RMs will need to check those employees highligted in ' + colors + '.',ui.ButtonSet.OK);
}

function promptCertExpire() {
  ui = SpreadsheetApp.getUi();
  var response = ui.alert('Does this certification expire?',ui.ButtonSet.YES_NO_CANCEL);
  Logger.log('Does cert expire: ' + response);
  return response;
}

function promptCertExpireYrs(){
  ui = SpreadsheetApp.getUi();
  var yrs;
  do {
    var response = ui.prompt('Certification Length','How many years is the certificate valid for?\n'+tenYearStates+' = 10\n'+twoYearStates+' = 2\n'+oneYearStates+' = 1',ui.ButtonSet.OK);
    var text = parseInt(response.getResponseText());
    var button = response.getSelectedButton();
  } while (!(button == ui.Button.CLOSE) && !(text == 10 || text == 2 || text == 1)); // !(/^[0-9]+$/.test(text)) <-- To test if positive int
  if (button == ui.Button.OK){
    yrs = response.getResponseText();
  }
  Logger.log('Cert expires in %s years',yrs);
  return yrs;
}

function promptClientOrRM() {
  ui = SpreadsheetApp.getUi();
  var response = ui.alert('Is this being sent to the client?',ui.ButtonSet.YES_NO);
  Logger.log('Will the client see it: ' + response);
  return response;
}

function promptBugReport(){
  ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Email Message','Please enter your message to the developer.',ui.ButtonSet.OK_CANCEL);
  var message = response.getResponseText();
  var button = response.getSelectedButton();
  var info = [button,message];
  Logger.log('Response: %s, Button: %s, Message: %s, Info: %s',response,button,message,info);
  return info;
}

function displayKey() {
  SpreadsheetApp.getUi().alert("⚠️ Employee Record Key", 'The general color coding system is as follows: \n\nRED: Updates Required - These are the records to adjust\nWHITE: Correct Records - Ignore these employees\nGREEN: Completed Updates - These records have already been updated\nBLACK: Inactive Employees - Ignore these employees', SpreadsheetApp.getUi().ButtonSet.OK);
}

function displayValues(range){
  checkCols();
  checkRows();
  if (range == null) {
    range = sheet.getActiveRange();
  }
  var cols = 'lastCol: ' + lastCol + '   maxCol: ' + maxCol;
  var rows = 'lastRow: ' + lastRow + '   maxRow: ' + maxRow;
  var rangeA1 = 'activeRange: ' + range.getA1Notation();
  SpreadsheetApp.getUi().alert(cols + '\n' + rows + '\n' + rangeA1,SpreadsheetApp.getUi().ButtonSet.OK);
}

function functionTBD() {
  ui.alert("⚠️ Function Not Defined","This functionality is still in process and not currently active. Please proceed with manual adjustments and be patient while additional scripts are written.", ui.ButtonSet.OK);
  ss.toast(msgCancelledOperation);
}
