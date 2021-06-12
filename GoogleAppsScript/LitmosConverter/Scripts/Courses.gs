
var a1FormulaExp = '=IF(ISERROR(FILTER(B2:B,G2:G>80,H2:H=FALSE)),"0/0",COUNTA(FILTER(B2:B,G2:G>80,H2:H=FALSE))-COUNTIF(A2:A,"=TRUE")-COUNTIFS(J2:J,"=FALSE",G2:G,">80",H2:H,"=FALSE") & "/" & COUNTA(FILTER(B2:B,G2:G>80,H2:H=FALSE))-COUNTIFS(J2:J,"=FALSE",G2:G,">80",H2:H,"=FALSE"))';
var a1FormulaInf = '=IF(ISERROR(FILTER(B2:B,NOT(ISBLANK(R2:R)))),"0/0",COUNTA(FILTER(B2:B,NOT(ISBLANK(R2:R))))-COUNTIF(A2:A,"=TRUE") & "/" & COUNTA(FILTER(B2:B,NOT(ISBLANK(R2:R)))))';
var a1FormulaCT = '';

// var certLength = promptCertificationLength();
        // if (certLength == 0){

        // } else if (certLength == 1) {

        // } else if (certLength == 2) {

        // } else if (certLength == 10) {

        // } else {
        //   // Could not find certification matching that length of time.  TRY AGAIN???
        // }

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



function convertCourseReport(exp){
  sheet = ss.getActiveSheet();
  var lastCol = sheet.getLastColumn();
  if (lastCol == 18) {
    ss.toast(formatOnly);
    formatCourseReport(exp);
    return;
  } else if (!lastCol == 35){
    Logger.log("No Deletion")
    ss.toast(colDelete);
    return;
  } 
  delColumnsCourse();
  delRows();
  freezeTopRow();
  addCheckBoxes();
  formatCourseReport(exp);
}


function delColumnsCourse() {
  sheet = ss.getActiveSheet();
  checkCols();
  ss.toast(msgStartColDelete);

  sheet.deleteColumns(26,maxCol-lastCol+1);
  sheet.deleteColumns(17,2);
  sheet.deleteColumns(14,2);
  sheet.deleteColumn(12);
  sheet.deleteColumns(5,3);
  sheet.hideColumns(2,2);
  sheet.getRange('F1').setValue('% Comp');

  resizeCols();
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

function formatCourseReport(exp){
  sheet = ss.getActiveSheet();
  var lastCol = sheet.getMaxColumns();
  var lastRow = sheet.getMaxRows();
  Logger.log('lastCol = ' + lastCol);
  if (!lastCol == 18) {
    ss.toast(colStructureFalse);
    return;
  }
  ss.toast(formatOnly);
  addA1Formula(exp);
  sheet.clearConditionalFormatRules();
  // // TODO: Add IF statement to check if column structure matches already converted sheet
  // if (lastCol != 18) {
  //   ss.toast(formatOnly);
  //   formatCourseReport(exp); // Move actual code here!  OR switch the statement around to return if not properly structured first!!!
  //   return;  // Is this necessary?
  // }
  var range = sheet.getRange(sheet.getRange(2,1,lastRow-1,lastCol).getA1Notation());
  Logger.log(range);
  var formulaArray = [];
  formulaArray.push("=$A2"); // For checkboxes
  formulaArray.push("=$J2=FALSE"); // For finding inactive users
  var rules = [];
  var rulesX = [];
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[0]).setBackground("lime").setRanges([range]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[1]).setBackground("black").setFontColor("white").setRanges([range]).build());

  if(exp == 0){
    formulaArray.push("=AND($J2,NOT(ISBLANK($R2)))");
  } else if (exp == 1) {
    formulaArray.push("=AND($G2=100,$H2=FALSE)");
  } else if (exp == 2) {
    formulaArray.push("=AND($G2>80,$H2=FALSE)");
  } else if (exp == 10) {
    formulaArray.push("=AND(NOT(ISBLANK($Q2)),OR(AND(YEAR($R2)<YEAR($Q2)+10,NOT(ISBLANK($R2))),AND($G2=100,ISBLANK($R2))))");
    formulaArray.push("=YEAR($R2)<YEAR(TODAY())");
    rulesX.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[3]).setBackground("orange").setRanges([range]).build());
  }
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formulaArray[2]).setBackground("red").setRanges([range]).build());
  
  if (formulaArray.length>3){
    for (i=0;i<rulesX.length;i++){
      rules.push(rulesX[i]);
    }
  }
  for (i=0;i<rules.length;i++){
    addConditionalFormatRule(sheet,rules[i]);
  }
  
  resizeCols();
  range.sort([7,1]);

}



