var msgCancelledOperation = 'The operation has been cancelled!';
var msgStartColDelete = 'Adjusting column structure...';
var msgStartFormat = 'Conditional formatting being applied...';

function alertColumnMisMatch() {
  ui.alert("⚠️ Column Mismatch",'Your column structure does NOT match what is expected for this type of report and the operation has been cancelled!  Please confirm that you have the correct report selected before attempting the operation again.',SpreadsheetApp.getUi().ButtonSet.OK);
}

function alertAlreadyConverted() {
  var response = ui.alert("Looks like the column structure has already been converted.  Would you like to format the sheet?",ui.ButtonSet.YES_NO);
  Logger.log('Want to format sheet: ' + response);
  return response;
}

function alertNeedsConversion() {
  var response = ui.alert("⚠️ Adjust Columns",'Your total number of columns indicates this report still needs to be converted before formatting can be applied. \nWould you like to convert the sheet now?',SpreadsheetApp.getUi().ButtonSet.YES_NO);
  Logger.log('Want to convert sheet: ' + response);
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

function promptCertExpire() {
  ui = SpreadsheetApp.getUi();
  var response = ui.alert('Does this certification expire?',ui.ButtonSet.YES_NO_CANCEL);
  Logger.log('Does cert expire: ' + response);
  return response;
}

function promptClientOrRM() {
  ui = SpreadsheetApp.getUi();
  var response = ui.alert('Is this being sent to the client?',ui.ButtonSet.YES_NO);
  Logger.log('Will the client see it: ' + response);
  return response;
}

function displayKey() {
  SpreadsheetApp.getUi().alert("⚠️ Employee Record Key", 'Only adjust those records highlighted in Red. The color code is as follows: \n\nRED: Updates Required - These are the records to adjust\nWHITE: Correct Records - Ignore these employees\nGREEN: Completed Updates - These records have already been updated\nBLACK: Inactive Employees - Ignore these employees', SpreadsheetApp.getUi().ButtonSet.OK);
}

function functionTBD() {
  ui.alert("⚠️ Function Not Defined","This functionality is still in process and not currently active. Please proceed with manual adjustments and be patient while additional scripts are written.", ui.ButtonSet.OK);
  ss.toast(msgCancelledOperation);
}

// ------------------------------------------------------



var colStructureFalse = 'Column structure does not match expected input';
var colStructureTrue = 'Column Structure Match Found!\n\nStructure matches an already converted report.';
var colDelete = 'Column Structure Unchanged!\n\n' + colStructureFalse;
var formatOnly = colStructureTrue + ' Formatting instead.';
// var performingAction = 'Started converting report...';
// var formatBegin = 'Conditional formatting being updated.';
// var msgStartConversion = 'Started converting report...';







function msgColumnFormat() {
  ui.alert("⚠️ Column Mismatch",'Your total number of columns does not match what is expected for this type of report. \nConditional format will NOT be applied!',SpreadsheetApp.getUi().ButtonSet.OK);
}


function alertOperationCancelled() {
  ui.alert("⚠️ Cancelled",cancelledOperation,SpreadsheetApp.getUi().ButtonSet.OK);
}


function promptCertificationLength(){
  ui = SpreadsheetApp.getUi();
  do {
    var response = ui.prompt('How many years is the certification valid for?\nEnter "0" if it does not expire ' + nonExpiringStates + '.');
    var number = parseInt(response.getResponseText());
    var button = response.getSelectedButton();
  }
  while (!(/^[0-9]+$/.test(number)) && !(button == ui.Button.CLOSE));  // RegExp Help: https://www.w3schools.com/jsref/jsref_regexp_ndollar.asp
  
  if (response.getSelectedButton() == ui.Button.OK){
    Logger.log("User's entry: '%s'",response.getResponseText());
    Logger.log("Entry used: '%s'",number);
    return number;
  } else {
    Logger.log('User cancelled');
  }
}
