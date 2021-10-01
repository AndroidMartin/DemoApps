function update_function_list(){

// CONFIRM YOU WANT TO RUN
  //Browser.msgBox('ARE YOU SURE YOU ARE ON THE RIGHT WORKSHEET?!', Browser.Buttons.OK_CANCEL);
  
// Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
// user can also close the dialog by clicking the close button in its title bar.
//var ui = DocumentApp.getUi();
//var response = ui.prompt('Getting to know you', 'May I know your name?', ui.ButtonSet.YES_NO);

var response = Browser.msgBox("ATTENTION","You are about to DELETE ALL DATA on this worksheet, including the manually entered 'Status' of each event!  Are you ABSOLUTELY certain you want to continue?!", Browser.Buttons.YES_NO);
  if(response=="no")
    return;
  else if(response=="cancel")
    return;
  else
  
// Process the user's response.
//if (response.getSelectedButton() == ui.Button.YES) {
  //Logger.log('The user\'s name is %s.', response.getResponseText());
//} else if (response.getSelectedButton() == ui.Button.NO) {
  //Logger.log('The user didn\'t want to provide a name.');
//} else {
  //Logger.log('The user clicked the close button in the dialog\'s title bar.');
//}


//
// Export Google Calendar Events to a Google Spreadsheet
//
// This code retrieves events between 2 dates for the specified calendar.
// It logs the results in the current spreadsheet starting at cell A2 listing the events,
// dates/times, etc and even calculates event duration (via creating formulas in the spreadsheet) and formats the values.
//
// I do re-write the spreadsheet header in Row 1 with every run, as I found it faster to delete then entire sheet content,
// change my parameters, and re-run my exports versus trying to save the header row manually...so be sure if you change
// any code, you keep the header in agreement for readability!
//
// 1. Please modify the value for mycal to be YOUR calendar email address or one visible on your MY Calendars section of your Google Calendar
// 2. Please modify the values for events to be the date/time range you want and any search parameters to find or omit calendar entires
// Note: Events can be easily filtered out/deleted once exported from the calendar
// 
// Reference Websites:
// https://developers.google.com/apps-script/reference/calendar/calendar
// https://developers.google.com/apps-script/reference/calendar/calendar-event
//

var mycal = "gatherhere.com_odrppn1trdti1nehbu6f547pto@group.calendar.google.com";
var cal = CalendarApp.getCalendarById(mycal);

// Optional variations on getEvents
// var events = cal.getEvents(new Date("January 3, 2014 00:00:00 CST"), new Date("January 14, 2014 23:59:59 CST"));
// var events = cal.getEvents(new Date("January 3, 2014 00:00:00 CST"), new Date("January 14, 2014 23:59:59 CST"), {search: 'word1'});
// 
// Explanation of how the search section works (as it is NOT quite like most things Google) as part of the getEvents function:
//    {search: 'word1'}              Search for events with word1
//    {search: '-word1'}             Search for events without word1
//    {search: 'word1 word2'}        Search for events with word2 ONLY
//    {search: 'word1-word2'}        Search for events with ????
//    {search: 'word1 -word2'}       Search for events without word2
//    {search: 'word1+word2'}        Search for events with word1 AND word2
//    {search: 'word1+-word2'}       Search for events with word1 AND without word2
//
  var events = cal.getEvents(new Date("January 1, 2018 00:00:00 CST"), new Date("December 31, 2018 23:59:59 CST"));


var sheet = SpreadsheetApp.getActiveSheet();
// Uncomment this next line if you want to always clear the spreadsheet content before running - Note people could have added extra columns on the data though that would be lost
sheet.clearContents();  

// Create a header record on the current spreadsheet in cells A1:N1 - Match the number of entries in the "header=" to the last parameter
// of the getRange entry below
var header = [["Event Start", "Event Title", "Contact", "Event End", "Duration", "Date Created", "Last Updated", "Day Only", "Size", "Time", "Type", "ref", "txtSizer", "stNum", "Status"]];
var range = sheet.getRange(1,1,1,15);
range.setValues(header);

  
// Loop through all calendar events found and write them out starting on calulated ROW 2 (i+2)
for (var i=0;i<events.length;i++) {
var row=i+2;
var myformula_placeholder = '';
// Matching the "header=" entry above, this is the detailed row entry "details=", and must match the number of entries of the GetRange entry below
// NOTE: I've had problems with the getVisibility for some older events not having a value, so I've had do add in some NULL text to make sure it does not error
var details=[[events[i].getStartTime(), events[i].getTitle(), events[i].getDescription(), events[i].getEndTime(), myformula_placeholder, events[i].getDateCreated(), events[i].getLastUpdated(), myformula_placeholder, myformula_placeholder, myformula_placeholder, myformula_placeholder, myformula_placeholder, myformula_placeholder, myformula_placeholder, myformula_placeholder]];
var range=sheet.getRange(row,1,1,15);
range.setValues(details);

// Writing formulas from scripts requires that you write the formulas separate from non-formulas
// Write the formula out for this specific row in column 7 to match the position of the field myformula_placeholder from above: foumula over columns F-E for time calc
var cell=sheet.getRange(row,5);
cell.setFormula('=IF((HOUR(INDIRECT("D" & ROW()))+(MINUTE(INDIRECT("D" & ROW()))/60))-(HOUR(INDIRECT("A" & ROW()))+(MINUTE(INDIRECT("A" & ROW()))/60))>0,(HOUR(INDIRECT("D" & ROW()))+(MINUTE(INDIRECT("D" & ROW()))/60))-(HOUR(INDIRECT("A" & ROW()))+(MINUTE(INDIRECT("A" & ROW()))/60)),IF((HOUR(INDIRECT("D" & ROW()))+(MINUTE(INDIRECT("D" & ROW()))/60))-(HOUR(INDIRECT("A" & ROW()))+(MINUTE(INDIRECT("A" & ROW()))/60))<0,(HOUR(INDIRECT("D" & ROW()))+(MINUTE(INDIRECT("D" & ROW()))/60))-(HOUR(INDIRECT("A" & ROW()))+(MINUTE(INDIRECT("A" & ROW()))/60))+24,"N/A"))');
cell.setNumberFormat('.00');

// Date (removes time from reservation)
var cell=sheet.getRange(row,8);
cell.setFormula('=DATE(YEAR(INDIRECT("A" & ROW())),MONTH(INDIRECT("A" & ROW())),DAY(INDIRECT("A" & ROW())))');
  
// Size (as number)
var cell=sheet.getRange(row,9);
cell.setFormula('=IFERROR(VALUE(MID(INDIRECT("M" & ROW()),INDIRECT("N" & ROW()),3)),"N/A")');
  
// Time (as text)
var cell=sheet.getRange(row,10);
cell.setFormula('=IF(HOUR(INDIRECT("A" & ROW()))=0,"12am",IF(HOUR(INDIRECT("A" & ROW()))<12,HOUR(INDIRECT("A" & ROW())) & (IF(MINUTE(INDIRECT("A" & ROW()))>0,":" & MINUTE(INDIRECT("A" & ROW())), "")) & "am", HOUR(INDIRECT("A" & ROW()))-12 & (IF(MINUTE(INDIRECT("A" & ROW()))>0,":" & MINUTE(INDIRECT("A" & ROW())), "")) & "pm"))');
  // cell.setFormula('=IF(HOUR(A2)<12,HOUR(A2),HOUR(A2)-12 & "pm")');

// Type
var cell=sheet.getRange(row,11);
cell.setFormula('=IF(MID(INDIRECT("C" & ROW()),1,4)="http","Note",IF(ISERROR(SEARCH("Table Service",INDIRECT("B" & ROW())))=FALSE,"Table Service",IF(ISERROR(SEARCH("Reservation",INDIRECT("B" & ROW())))=FALSE,"Reservation","Unknown")))');

// reference to full date and time - Not sure why???
var cell=sheet.getRange(row,12);
cell.setFormula('="A" & ROW()');
  
// Text Size (approximates from large string)
var cell=sheet.getRange(row,13);
cell.setFormula('=IFERROR(IF(SEARCH("Estimated",INDIRECT("C" & ROW()))-4>0,MID(INDIRECT("C" & ROW()),SEARCH("Estimated",INDIRECT("C" & ROW()))-4,3),MID(INDIRECT("C" & ROW()),SEARCH("Estimated",INDIRECT("C" & ROW()))-3,3)),"N/A")');

// Start Number (group size from text)
var cell=sheet.getRange(row,14);
cell.setFormula('=IF(OR(MID(INDIRECT("M" & ROW()),1,1)="1",MID(INDIRECT("M" & ROW()),1,1)="2",MID(INDIRECT("M" & ROW()),1,1)="3",MID(INDIRECT("M" & ROW()),1,1)="4",MID(INDIRECT("M" & ROW()),1,1)="5",MID(INDIRECT("M" & ROW()),1,1)="6"),1,2)');
  
// Status
var cell=sheet.getRange(row,15);
cell.setFormula('="TBD"');
  
}
}


function onOpen() {
  Browser.msgBox('App Instructions - Please Read This Message', 'TO UPDATE EVENTS LIST:', '1) Be certain you are on the "Events" worksheet\\n2) Click Tools then Script Editor\\n3) Click Run -> Run Function -> update_funtction_list', Browser.Buttons.OK);

}
