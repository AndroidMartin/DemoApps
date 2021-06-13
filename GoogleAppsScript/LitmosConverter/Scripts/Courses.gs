// Set A1 Formulas in variable form
var a1FormulaExp = '=IF(ISERROR(FILTER(B2:B,G2:G>80,H2:H=FALSE)),"0/0",COUNTA(FILTER(B2:B,G2:G>80,H2:H=FALSE))-COUNTIF(A2:A,"=TRUE")-COUNTIFS(J2:J,"=FALSE",G2:G,">80",H2:H,"=FALSE") & "/" & COUNTA(FILTER(B2:B,G2:G>80,H2:H=FALSE))-COUNTIFS(J2:J,"=FALSE",G2:G,">80",H2:H,"=FALSE"))';
var a1FormulaInf = '=IF(ISERROR(FILTER(B2:B,NOT(ISBLANK(R2:R)))),"0/0",COUNTA(FILTER(B2:B,NOT(ISBLANK(R2:R))))-COUNTIF(A2:A,"=TRUE") & "/" & COUNTA(FILTER(B2:B,NOT(ISBLANK(R2:R)))))';
var a1FormulaCT = ''; // ToDo: Add formula for 10 year certification


function convertCourseReport(exp){
  sheet = ss.getActiveSheet();
  if (alertConfirmConversion('Course') == "YES"){ // Confirm action
    var wasFormatted = delColumnsCourse(exp); // Delete columns
    if (wasFormatted == false){ // if wasn't formatted during deletion, do so now
      formatCourseReport(exp);
    } else if (wasFormatted == null){ // if null, there was an error during formatting
      ss.toast(msgCancelledOperation);
    }
  }else {
    ss.toast(msgCancelledOperation);
  }
}


function delColumnsCourse(exp) {
  sheet = ss.getActiveSheet();
  checkCols();
  var wasFormatted;

  // Check for expected formats
  if (lastCol == 35) { // raw csv data has 35 columns
    ss.toast(msgStartColDelete);
    sheet.deleteColumns(26,maxCol-26+1);
    sheet.deleteColumns(17,2);
    sheet.deleteColumns(14,2);
    sheet.deleteColumn(12);
    sheet.deleteColumns(5,3);
    sheet.hideColumns(2,2);
    sheet.getRange('F1').setValue('% Comp');
    cleanUp();
    wasFormatted = false;
  } else if (lastCol == 18 || lastCol == 17) { // formatted data has 17 columns (18 w/ checkboxes)
      if (alertAlreadyConverted() == "YES") {
        formatCourseReport(exp);
        wasFormatted = true;
      } else {
        ss.toast(msgCancelledOperation);
      }
  } else {
    alertColumnMisMatch(); // column structure didn't match expected
  }
  return wasFormatted;
}

function formatCourseReport(exp){
  sheet = ss.getActiveSheet();
  checkCols();

  // How long is the certificate valid for?
  if (exp == null) {
    exp = getExpiresYrs();
    if (exp == null){
      Logger.log("Format not applied, 'Certification Length' is null.");
      ss.toast(msgCancelledOperation);
      return;
    }
  }

  // Check to see if the file needs to be converted first
  if (lastCol == 35) {
    if (alertNeedsConversion() == "YES") {
      delColumnsCourse();
    } else {
      ss.toast(msgCancelledOperation);
      return;
    }
  }

  // At this point, it should be properly converted and formatting can be applied
  if (lastCol == 18 || lastCol == 17){ 
    startFormat();
    // Does the sheet have checkboxes? if NO, then add them.
    if (!testCheckBox()){
      addCheckBoxes();
      checkCols();
      addA1Formula(exp);
    }
    var formulaArray = [];
    var rules = [];
    var rulesX = [];
    var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
    // var hiddenColumns = [sheet.getRange(1,7),sheet.getRange(1,8)];  // Check for hidden columns?
    Logger.log('Formatting range: ' + range.getA1Notation());

    // Formatting Rules
    sheet.clearConditionalFormatRules();
    formulaArray.push("=$A2"); // For checkboxes
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
    formulaArray.push("=$J2=FALSE"); // For finding inactive users
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("black").setFontColor("white").setRanges([range]).build());

    if(exp == 0){ // For determining compliance status
      formulaArray.push("=AND($J2,NOT(ISBLANK($R2)))");
    } else if (exp == 1) {
      formulaArray.push("=AND($G2=100,$H2=FALSE)");
    } else if (exp == 2) {
      formulaArray.push("=AND($G2>80,$H2=FALSE)");
    } else if (exp == 10) {
      // ToDo: Confirm the rules below are correct on a real 10-year report
      formulaArray.push("=AND(NOT(ISBLANK($Q2)),OR(AND(YEAR($R2)<YEAR($Q2)+10,NOT(ISBLANK($R2))),AND($G2=100,ISBLANK($R2))))");
      formulaArray.push("=YEAR($R2)<YEAR(TODAY())"); // Additional rule for verifying newer compliance rules
      rulesX.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("orange").setRanges([range]).build());
    }
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
    
    if (rulesX.length>0){
      for (i=0;i<rulesX.length;i++){
        rules.push(rulesX[i]);
      }
    }
    for (i=0;i<rules.length;i++){
        addConditionalFormatRule(sheet,rules[i]);
    }

    range.sort([7,1]);
    cleanUp();
  } else {
    alertColumnMisMatch();
  }
}

function addA1Formula(exp){
  var formula;
  if (exp == 0) {
    formula = a1FormulaInf;
  } else if (exp == 1 || exp == 2) {
    formula = a1FormulaExp;
  } else if (exp == 10) {
    formula = a1FormulaCT;
  }
  sheet.getRange("A1").setFormula(formula);
  sheet.autoResizeColumn(1);
}

// Functions to be called in menu options
function convert2yrCourseReport(){
  convertCourseReport(2);
}

function convert1yrCourseReport(){
  convertCourseReport(1);
}

function convert0yrCourseReport(){
  convertCourseReport(0);
}

function convertCtCourseReport(){
  convertCourseReport(10);
}

function format0yr() {
  formatCourseReport(0);
}

function format1yr() {
  formatCourseReport(1);
}

function format2yr() {
  formatCourseReport(2);
}

function format10yr() {
  formatCourseReport(10);
}
