var ui;
var ss;
var sheet;
var developerEmail = 'codingmartinpro@gmail.com, amarted@gmail.com';
var slidesFile = '1N3OfV4ZDHqiSqmBCnyNEUmCUDeD5MwfrhgdGU6nvK20';

function onOpen() {
  ui = SpreadsheetApp.getUi();
  ui.createMenu ('LDS Tools')
    .addItem('Open Slides','openSlides')
    .addSeparator()
    .addItem('Updates','updatesMessage')
    .addItem('Email Developer','emailDeveloper')
  .addToUi();

  if (enableWarning) {
    ui.alert(warningTitle,warningMsg,ui.ButtonSet.OK);
  }

  ui.alert('LAST UPDATE',updatesAll[0] + '\n\nNOTE: Use "LDS TOOLS -> Updates" to see complete list!',ui.ButtonSet.OK);
}


function insertImage(imageURL,resizeRatio,colLocation,rowLocation,callingFunction,buttonName,buttonNum) {
  sheet = SpreadsheetApp.getActiveSpreadsheet();

  // Insert an image from Google Drive (PNG)
  var fileID = imageURL.match(/[\w\_\-]{25,}/).toString();
  var img = DriveApp.getFileById(fileID).getBlob();

  var cellX = sheet.getColumnWidth(colLocation);
  var cellY = sheet.getRowHeight(rowLocation);
  var buttonSize;
  if (cellX < cellY){
    buttonSize = cellX * resizeRatio;
  } else {
    buttonSize = cellY * resizeRatio;
  }
  buttonSize = Math.round(buttonSize);
  var xOffset = (cellX/2) - (buttonSize/2);
  var yOffset = (cellY/2) - (buttonSize/2);
  
  sheet.insertImage(img,colLocation,rowLocation,xOffset,yOffset).setHeight(buttonSize).setWidth(buttonSize).setAltTextTitle(buttonName+buttonNum).assignScript(callingFunction);
  var imgList = sheet.getImages();
  var l = imgList.length;
  var imgName = imgList[l-1].getAltTextTitle();
  Logger.log('- INSERTED IMAGE - \nimageName: %s\nimageURL: %s\nfileID: %s\nblob: %s\nCell X: %s  Cell Y: %s\nResizing to: %s\nMoving to position: %sx%s',
      imgName,imageURL,fileID,img,cellX,cellY,buttonSize,xOffset,yOffset);
}

function imagesDelete(buttonLimit){
  sheet = SpreadsheetApp.getActiveSheet();
  var images = sheet.getImages();
  var imgName;
  var imgString = 'Total Buttons: ' + images.length + '\n';

  for (i=0;i<images.length;i++){
    imgName = images[i].getAltTextTitle();
    imgString = imgString + 'Image ' + i + ': ' + imgName +'\n';
  }Logger.log(imgString);

  for (j=buttonLimit;j<images.length;j++){
    images[j].remove();
  } 
}

function clearRange(range){
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = SpreadsheetApp.getActiveSheet();
  
  var r = sheet.getRange(range[0],range[1],range[2],range[3]);
  var range = r.getA1Notation();
  r.clearContent();
  Logger.log('Clear Range: %s',range);
}

function updatesMessage(){
  var updateList = 'LIST OF CHANGES\n\n';
  for (i=0;i<updatesAll.length;i++){
    updateList = updateList + updatesAll[i] + '\n\n';
  }
  ui = SpreadsheetApp.getUi();
  ui.alert(updateList);
}

function provideURL(url,text) {
  var htmlOutput = HtmlService
    .createHtmlOutput('Open <a href="' + url +'" target=_blank>' + text + '</a>!')
    .setWidth(250) //optional
    .setHeight(50); //optional
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Navigate to New Site');
}

function openSlides() {
  var presentation = SlidesApp.openById(slidesFile);
  var url = presentation.getUrl();
  var text = 'Jewelry Slides';
  provideURL(url,text);
}

function TBD(){
  ui = SpreadsheetApp.getUi();
  ui.alert('This function is still under development.');
}

function sheetVariables(formType){
  // formType = "MATERIALS";  ToDo: Compare with newer version!!!
  ui = SpreadsheetApp.getUi();
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = SpreadsheetApp.getActiveSheet();
  var variables = [];
  // FUNCTION TO SET ALL RANGES FOR LISTED ITEMS
  var tLog = 'VARIABLE LIST FOR ' + formType;

  var listMerges = [];
  var mergeRanges = '';

  if (formType == 'MATERIALS'){
    var countCell = sheet.getRange('M5'); // variables[0]
    var listStartCell = sheet.getRange('C9'); // variables[1]
    var listNumCol = sheet.getRange('M8').getValue(); // variables[2]
    var listMerges = [sheet.getRange('G9:H9')]; // variables[3]
    var listDelImgURL = 'https://drive.google.com/file/d/1jOn6hhIvXzAwdBEDO2mhpOPxbuvrQW4d'; // variables[4]
    var resizeRatio = .7; // variables[5]
    var callingFunction = 'clearRow';  // variables[6]
    var buttonLimit = 4;  // variables[7]
    var supplier = sheet.getRange('C5').getValue(); // variables[8]
    var datePurchased = sheet.getRange('F5').getValue(); // variables[9]
    var shipping = sheet.getRange('K5').getValue(); // variables[10]
    var currency = sheet.getRange('I5').getValue(); // variables[11]
    
    variables =[countCell,listStartCell,listNumCol,listMerges,listDelImgURL,resizeRatio,callingFunction,buttonLimit,supplier,datePurchased,shipping,currency];


    for (i=0;i<listMerges.length;i++){ // Gets list of merge ranges by A1 notation for log/messaging
      var temp = listMerges[i];
      mergeRanges = mergeRanges + temp.getA1Notation() + ', ';
    } mergeRanges = mergeRanges + 'in A1 Notation';

    // Set log of 'formType' variables being called
    var vLog = '\n(0) Counting Cell: ' + variables[0].getA1Notation() + ', in A1 Notation\n(3) Merging Cells: ' + mergeRanges + '\n(1) Starting Cell: ' + variables[1].getA1Notation() + ', in A1 Notation\n(2) Column Span: ' + variables[2] + '\n(7) ButtonLimit: ' + variables[7] + '\n(4) Image URL: ' + variables[4] + '\n(5) Resize Ratio: ' + variables[5] + '\n(6) Image Function: ' + variables[6] + '\n(9) Date Purchased: ' + variables[9] + '\n(8) Supplier: ' + variables[8] + '\n(11) Currency: ' + variables[11] + '\n(10) Total Shipping: ' + variables[10];
  } else {
    tLog = 'No Variable List Found!';
    vLog = "Unable to fetch variable list without 'formType'";
    ss.toast(vLog,tLog);
  } Logger.log(tLog + vLog);
  
  return variables;
}





function clearForm(isClear,sheetInfo){
  // ss = SpreadsheetApp.getActiveSpreadsheet();
  // sheet = SpreadsheetApp.getActiveSheet();

  // WARNING BEFORE CLEARING ENTRY FORM
  if (isClear) {
    ui = SpreadsheetApp.getUi();
    var response = ui.alert('Clear Form?','Are you sure you want to clear the form?',ui.ButtonSet.OK_CANCEL);
    Logger.log('Clear Form: %s',response);
    if (!(response == ui.Button.OK)) {
      ss.toast('Operation Canceled');
      return;
    }
  }
  // GET SHEET INFO
  var countCell = sheetInfo[0];
  var listStartCell = sheetInfo[1];
  var listNumCol = sheetInfo[2];
  var buttonLimit = sheetInfo[7];

  var listStartRow = listStartCell.getRow();
  var listStartCol = listStartCell.getColumn();
  var count = countCell.getValue();
  var listFirstEntry = [listStartRow,listStartCol,1,listNumCol];
  Logger.log('-CLEARING FORM -\nRange: %s\nStartRow: %s, StartCol: %s',listFirstEntry,listStartRow,listStartCol);

  // CLEAR BUTTONS
  Logger.log('- DELETING ITEM BUTTONS -');
  imagesDelete(buttonLimit);

  // DELETE MULTIPLE ENTRIES
  if (count > 1) {
    Logger.log('- DELETING ROWS -');
    sheet.deleteRows(listStartRow+1,count-1);
    count = 1;
    countCell.setValue(count);
  }
  // CLEAR FIRST ENTRY
  clearRange(listFirstEntry);

  // CLEAR ORPHANED CELLS
  sheet.getRange(5,3).clearContent(); // Clear vendor
  sheet.getRange(5,6).clearContent(); // Clear DateReceived
  sheet.getRange(5,8).clearContent(); // Clear TotalPrice
  sheet.getRange(5,11).clearContent(); // Clear Shipping

  // ADD IMAGE TO FIRST ENTRY
  // insertImage(sheetInfo[4],sheetInfo[5],listStartCol-1,listStartRow,sheetInfo[6],'ButtonItemDelete',count);
}

function addListItem(formType,sheetInfo){
  // ss = SpreadsheetApp.getActiveSpreadsheet();
  // sheet = SpreadsheetApp.getActiveSheet();

  // GET SHEET INFO
  if (formType == "MATERIALS"){ // make check for form type here or when calling clearForm???
    var countCell = sheetInfo[0];
    var listStartCell = sheetInfo[1];
    var listMerges = sheetInfo[3];
  }

  var listStartRow = listStartCell.getRow();
  var listStartCol = listStartCell.getColumn();
  var count = countCell.getValue();
  var combine;

  // ADDING NEW LINE FOR ITEM
  ss.insertRowBefore(listStartRow);
  count++;
  countCell.setValue(count);

  for (i=0;i<listMerges.length;i++){
    combine = listMerges[i];
    combine.merge();
  }

  // ToDo: Add data validation to each entry - DO IN: function addListItem2(sheetInfo){}
  
  // Adds "Delete Row" Button to each entry
  // insertImage(sheetInfo[4],sheetInfo[5],listStartCol-1,listStartRow,sheetInfo[6],'ButtonItemDelete',count);

  // var r = sheet.getRange(listStartRow,listStartCol); // Makes new entry active cell
  Logger.log('- SETTING ACTIVE CELL -\nRow: %s, Col: %s',listStartRow,listStartCol);
  var r = sheet.getRange(listStartCell.getA1Notation());
  sheet.setActiveSelection(r); 
}



function emailDeveloper() {
  sheet = SpreadsheetApp.getActiveSheet();
  ui = SpreadsheetApp.getUi();
  var subject = 'DEV REPORT - Jewelry';
  var result = ui.prompt('Message for Developer','Enter your message:',ui.ButtonSet.OK_CANCEL);
  var button = result.getSelectedButton();
  var message = result.getResponseText();
  if (button == ui.Button.OK){
    var sender = Session.getActiveUser().getEmail();
    MailApp.sendEmail(developerEmail,subject,message,{cc: sender});
    ui.alert('Message successfully sent from ' + sender + '.\nCheck your email for a copy of what was sent!');
  } else {
    ui.alert('Email cancelled');
  }
}
