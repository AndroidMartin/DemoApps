var ui = SpreadsheetApp.getUi();
var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
var maxCol = 0;
var maxRow = 0;
var lastRow = 0;
var lastCol = 0;
var expiringStates = '(CA, CT, DE, NY)';
var nonExpiringStates = '(ME, Fed)';
var twoYearStates = 'CA & DE';
var oneYearStates = 'NY';
var tenYearStates = 'CT';
var zeroYearStates = 'ME & Fed';

// ToDo: Call 'ss' in "Major" functions and pass into "Minor" functions -OR- if 'ss' isn't passed to them, then getSS() - e.g.  formatTeamReport(ss)

function onOpen() {
  // var report1 = 'Course Report';
  // var report2 = 'Compliance Report';
  // var report3 = 'Team Report';
  // var report4 = 'People Report';
  // var report5 = 'Learning Path Report';
  // var report6 = 'Module Reports';
  // var report7 = 'Assessment Report';
  // var report8 = 'Achievements Report';

  var course1 = '2-YR Certs (CA, DE)';
  var course2 = '1-YR Certs (NY)';
  var course3 = 'Indefinite (ME, Fed)';
  var course4 = 'Connecticut (10-YR)';

  var expiringCourses = 'Expiring Courses ' + expiringStates;
  var nonExpiringCourses = 'Non-Expiring Courses ' + nonExpiringStates;  // 'Non-Expiring Courses (ME, Fed)'

  ui.createMenu ('RM Tools')
    .addItem('Create NEW Project','resetTemplate')
    .addSeparator()
    .addSubMenu(ui.createMenu('Convert Reports')
      .addSubMenu(ui.createMenu('Course Report')
        .addItem(course1,'convert2yrCourseReport')
        .addItem(course2,'convert1yrCourseReport')
        .addItem(course3,'convert0yrCourseReport')
        .addItem(course4,'convertCtCourseReport')
        .addSeparator()
        .addItem('Delete Columns','delColumnsCourse')
      )
      .addSubMenu(ui.createMenu('Compliance Report')
        .addSubMenu(ui.createMenu('For RMs')
          .addItem(expiringCourses,'rmComplianceReport')
          .addItem(nonExpiringCourses,'rm0yrComplianceReport')
        )
        .addSubMenu(ui.createMenu('For Clients')
          .addItem(expiringCourses,'clientComplianceReport')
          .addItem(nonExpiringCourses,'client0yrComplianceReport')
        )
        .addItem('Hybrid','hybridComplianceReport')
        .addSeparator()
        .addItem('Add Checkboxes','formatComplianceReportHybrid') // Still working on functionality
        .addItem('Delete Columns','delColumnsCompliance')
      )
      .addSubMenu(ui.createMenu('Team Report')
        .addItem('Convert Team','convertTeamReport')
        .addSeparator()
        .addItem('Delete Columns','delColumnsTeams')
      )
      .addSubMenu(ui.createMenu('People Reports')
        .addItem('Convert People','convertPeopleReport')
        .addSeparator()
        .addItem('Bulk Corrections', 'convertPeopleForBulkUpload')
      )
      .addSubMenu(ui.createMenu('Learning Path Report')
        .addItem('Convert Learning Path','convertLearningPathsReport')
        .addSeparator()
        .addItem('Delete Columns','delColumnsLearningPath') // Check functionality
      )
     .addSubMenu(ui.createMenu('Achievements Report')
        .addItem('Convert Achievements','convertAchievementsReport')
        .addSeparator()
        .addItem('Delete Columns','delColumnsAchievements')
      )
      .addSubMenu(ui.createMenu('Module Reports')
        .addItem('Specific Module','convertModulesReportSpec')
        .addItem('All Modules','convertModulesReportALL')
        .addSeparator()
        .addItem('Delete Columns','delColumnsModules')
      )
      .addSubMenu(ui.createMenu('Assessment Reports')
        .addItem('Specific Assessment','convertAssessmentsReportSpec')
        .addItem('All Assessments','convertAssessmentsReportALL')
        .addSeparator()
        .addItem('Delete Columns','delColumnsAssessments')
      )
      .addSeparator()
      .addItem('People -> Bulk Corrections','convertPeopleForBulkUpload')
    )
    .addSubMenu(ui.createMenu('Format Reports')  // ToDo: Properly link scripts
      .addSubMenu(ui.createMenu('Course Report')
          .addItem(course1, 'format2yr')
          .addItem(course2,'format1yr')
          .addItem(course3,'format0yr')
          .addItem(course4,'format10yr')
          .addSeparator()
          .addItem('Delete Columns','delColumnsCourse')
        )
      .addSubMenu(ui.createMenu('Compliance Report')
        .addItem('RM Formatting','formatComplianceReportRM') 
        .addItem('Client Formatting','formatComplianceReportClient')
        .addItem('Hybrid Formatting','formatComplianceReportHybrid')
      )
      .addItem('Team Report', 'formatTeamReport')
      .addItem('People Report', 'formatPeopleReport')
      .addItem('Learning Paths','formatLearningPathReport')
      .addItem('Achievements Report','formatAchievementsReport')
      .addSubMenu(ui.createMenu('Module Report')
        .addItem('Specific Module','formatModulesReportSpec')
        .addItem('All Modules','formatModulesReportALL')
      )
      .addSubMenu(ui.createMenu('Assessment Report')
        .addItem('Specific Assessment','delColumnsAssessmentsSpec')
        .addItem('All Assessments','delColumnsAssessmentsALL')
      )
    )
    .addSeparator()
    .addItem('Resize Columns','resizeCols')
    .addItem('Delete Last Rows','delRows')
    .addItem('Delete Last Columns','delCols')
    .addSeparator()
    .addItem('Add Checkboxes', 'addCheckBoxes')
    .addItem('Clear Sheet','clearSheet')
    .addSeparator()
    .addSubMenu(ui.createMenu('Help')
      .addItem('RM Color Key','displayKey')
      .addItem('Contact Developer','emailDev')
      .addSubMenu(ui.createMenu('Dev Tools')
        .addItem('Check Values','displayValues') // Add proper command
      )
    )
  .addToUi();
}

function checkCols(){
  sheet = ss.getActiveSheet();
  maxCol = sheet.getMaxColumns();
  lastCol = sheet.getLastColumn();
  Logger.log('Check Cols: Last = %s, Max = %s',lastCol, maxCol);
}

function checkRows(){
  sheet = ss.getActiveSheet();
  maxRow = sheet.getMaxRows();
  lastRow = sheet.getLastRow();
  rowArray = [lastRow,maxRow];
  Logger.log('Check Rows: Last = %s, Max = %s',lastRow,maxRow);
}

function freezeTopRow(){
  sheet = ss.getActiveSheet();
  sheet.setFrozenRows(1);
  var r = sheet.getMaxColumns();
  sheet.getRange(1,1,1,r).setFontWeight("bold")
}

function resizeCols(){
  sheet = ss.getActiveSheet();
  var maxC = sheet.getMaxColumns();
  sheet.autoResizeColumns(1,maxC);
}

function delRows(){
  ss.toast("Deleting Rows...");
  sheet = ss.getActiveSheet();
  lastRow = sheet.getLastRow();
  sheet.insertRowAfter(lastRow);
  maxRow = sheet.getMaxRows();
  var numRowsDel = maxRow - lastRow;
  Logger.log("lastRow = %s, maxRow = %s, Rows2Del = %s",lastRow,maxRow,numRowsDel);
  sheet.deleteRows(lastRow+1,numRowsDel);
}

function addCheckBoxes(a1Formula){
  ss.toast("Adding checkboxes...");
  sheet = ss.getActiveSheet();
  sheet.insertColumnBefore(1);
  lastRow = sheet.getLastRow();
  var firstColumn = sheet.getRange(2,1,lastRow-1);

  var enforceCheckbox = SpreadsheetApp.newDataValidation();
  enforceCheckbox.requireCheckbox();
  enforceCheckbox.setAllowInvalid(false);
  enforceCheckbox.build();

  firstColumn.setDataValidation(enforceCheckbox);
  // Set formula in A1
  if (!(a1Formula == null)) {
    sheet.getRange("A1").setFormula(a1Formula);
  }

  // Clean up the environment
  sheet.autoResizeColumn(1);
  checkCols();

  // ToDo: get current formatting rules and add checkbox rule to position [0]
}




function delCols(){
  // Delete empty columns at end of sheet
  // ToDo: Change function to 'delEmptySpace()' and add delRows(); -OR- create new script to call both
  ss.toast("Deleting Unused Columns...");
  sheet = ss.getActiveSheet();
  lastCol = sheet.getLastColumn();
  maxCol = sheet.getMaxColumns();
  var numColsDel = maxCol - lastCol;
  sheet.deleteColumns(lastCol+1,numColsDel);
}

function addConditionalFormatRule(sheet, rule){
  rules = sheet.getConditionalFormatRules();
  rules.push(rule);
  sheet.setConditionalFormatRules(rules);
  Logger.log('Set %s as format',rule);  // doesn't provide good data
}

function clearSheet(){
  sheet = ss.getActiveSheet();
  var response = ui.alert('⚠️ Are you SURE you want to DELETE EVERYTHING?!',ui.ButtonSet.YES_NO);  // Move message to Messages.gs ???
    if (response == ui.Button.YES){
      var maxC = sheet.getMaxColumns();
      var maxR = sheet.getMaxRows();
      sheet.getRange(1,1,maxR,maxC).clear();
    }
}

function resetTemplate(){
  var response = ui.alert('⚠️ Are you SURE you want to DELETE EVERYTHING?!\n\nMake sure to save a copy of the last project you were working on!!!',ui.ButtonSet.YES_NO); // Move message to Messages.gs ???
  if (response == ui.Button.YES){
    ss.insertSheet(0);
    var sheets = ss.getSheets();
    for (i=1;i<sheets.length;i++){
      ss.deleteSheet(sheets[i]);
    }
  }
}

function emailDev(){
  // ToDo: Add script to compose email and send to amartinenquiron@gmail.com
  functionTBD();
}

function cleanUp(){
  freezeTopRow();
  resizeCols();
  delRows();
  checkCols();
  checkRows();
}


function testCheckBox(){
  var r = sheet.getRange(2,1);
  var r2 = sheet.getRange(2,1).getA1Notation(); 
  var g = r.getDataValidation();
  var g2 = g != null && g.getCriteriaType() == SpreadsheetApp.DataValidationCriteria.CHECKBOX;
  Logger.log('Tested for checkboxes in %s: %s ',r2,g2);
  return g2;
  // ToDo: Check whole first column for checkboxes ???
}

function getExpires(){
    var responseExpires = promptCertExpire();
    if (responseExpires == 'YES') {
      return true;
    } else if (responseExpires == 'NO') {
      return false;
    } else {
      Logger.log('Returning null');
    }
}

function getExpiresYrs(){
    var responseExpires = promptCertExpire();
    if (responseExpires == 'YES') {
      return promptCertExpireYrs(); // Prompt for number of years and return
    } else if (responseExpires == 'NO') {
      return 0;
    } else {
      Logger.log('Returning null');
    }
}


function startFormat(){
  ss.toast(msgStartFormat); // Keep this here???
  Logger.log('Setting up formatting variables'); // ToDo: Remove unused log entries
  sheet.clearConditionalFormatRules();
  checkRows();
}

function sortReport(range,sortOrder){
  ss.toast(msgSortReport);
  if (range == null){
    checkCols();
    checkRows();
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  }
  if (sortOrder == null) {
    // ToDo: add msg/alert that there is no sort order
    alertSortFailed();
    return;
  }
  range.sort(sortOrder);
}

