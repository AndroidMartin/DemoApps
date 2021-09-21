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


// function insertImage(imageURL,resizeRatio,colLocation,rowLocation,callingFunction,buttonName,buttonNum) {
//   sheet = SpreadsheetApp.getActiveSpreadsheet();

//   // Insert an image from Google Drive (PNG)
//   var fileID = imageURL.match(/[\w\_\-]{25,}/).toString();
//   var img = DriveApp.getFileById(fileID).getBlob();

//   var cellX = sheet.getColumnWidth(colLocation);
//   var cellY = sheet.getRowHeight(rowLocation);
//   var buttonSize;
//   if (cellX < cellY){
//     buttonSize = cellX * resizeRatio;
//   } else {
//     buttonSize = cellY * resizeRatio;
//   }
//   buttonSize = Math.round(buttonSize);
//   var xOffset = (cellX/2) - (buttonSize/2);
//   var yOffset = (cellY/2) - (buttonSize/2);
  
//   sheet.insertImage(img,colLocation,rowLocation,xOffset,yOffset).setHeight(buttonSize).setWidth(buttonSize).setAltTextTitle(buttonName+buttonNum).assignScript(callingFunction);
//   var imgList = sheet.getImages();
//   var l = imgList.length;
//   var imgName = imgList[l-1].getAltTextTitle();
//   Logger.log('- INSERTED IMAGE - \nimageName: %s\nimageURL: %s\nfileID: %s\nblob: %s\nCell X: %s  Cell Y: %s\nResizing to: %s\nMoving to position: %sx%s',
//       imgName,imageURL,fileID,img,cellX,cellY,buttonSize,xOffset,yOffset);
// }

// function imagesDelete(buttonLimit){
//   sheet = SpreadsheetApp.getActiveSheet();
//   var images = sheet.getImages();
//   var imgName;
//   var imgString = 'Total Buttons: ' + images.length + '\n';

//   for (i=0;i<images.length;i++){
//     imgName = images[i].getAltTextTitle();
//     imgString = imgString + 'Image ' + i + ': ' + imgName +'\n';
//   }Logger.log(imgString);

//   for (j=buttonLimit;j<images.length;j++){
//     images[j].remove();
//   } 
// }

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
