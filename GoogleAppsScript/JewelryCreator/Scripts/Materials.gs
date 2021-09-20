var materialsSheetName = 'Materials';
var materialEntryForm = 'Entry Form - Materials';

function buttonClearMaterials(){
  var sheetInfo = sheetVariables('MATERIALS');
  clearForm(true,sheetInfo);
}

function buttonAddMaterial() {
  var sheetInfo = sheetVariables('MATERIALS');
  addListItem('MATERIALS',sheetInfo);
  //ToDo: Add Data Validation to each row as you add it
}

function buttonSubmitNewMaterial(){
  submitMaterials();
}

function onSelectionChange(e) {
  // Set background to red if a single empty cell is selected.
  sheet = SpreadsheetApp.getActiveSpreadsheet(); // ToDo: make button on entry form to start script instead of checking on EVERY selection change
  var sheetName = sheet.getSheetName();
  Logger.log(sheetName);

  if (sheetName == materialEntryForm || sheetName == 'Copy of ' + materialEntryForm) {
    var range = e.range;
    if(range.getNumRows() === 1 
        && range.getNumColumns() === 1 ) {
        // && range.getCell(1, 1).getValue() === "") {
      // range.setBackground("red");
      sheet.getRange("B8").setValue(range.getRow());
    }
  }
}


function submitMaterials(){
  ui = SpreadsheetApp.getUi();
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = SpreadsheetApp.getActiveSheet();

  var response = ui.alert("Are you sure you're ready to submit this order?",ui.ButtonSet.YES_NO);
  if (!(response == 'YES')){
    ss.toast('Materials NOT submitted.','Operation Cancelled');
    return;
  }

  var sheetInfo = sheetVariables('MATERIALS');
  var r = sheetInfo[1].getRow();
  var c = sheetInfo[1].getColumn();
  var numR = sheetInfo[0].getValue();
  var numC = sheetInfo[2];
  var supplier = sheetInfo[8];

  // var shipping = sheetInfo[10] / numR; //ToDo: use total number of items
  var currency = sheetInfo[11];
  var purchaseDate = sheetInfo[9]; //ToDO: Use this variable

  var itemQty = 0;
  for (i=0;i<numR;i++) {
    itemQty = itemQty + sheet.getRange(r+i,5).getValue();
    Logger.log('itemQty: %s',itemQty);
  }
  var shipping = sheetInfo[10] / itemQty;
  var v;
  var v2;
  var v3;
  var image;
  var qtys;

  for (i=0;i<numR;i++) {
    //ToDo: rename variables to make better sense
    v = sheet.getRange(r+i,c,1,numC).getValues();
    v[0].splice(5,1); // removes empty value in H
    v2 = v[0].splice(0,4);
    v3 = [v2.splice(-1,1)];
    v3[0].unshift(supplier);
    image = [v2.splice(0,1)];
    // var v4 = [v2.splice(-1,2)];
    qtys = v2[1];
    v2 = [[v2[1],v2[0]]];

    // WRITE TO MATERIALS    
    var writeSheet = ss.getSheetByName('Materials'); // TODO: Change name to "Materials" and move to better place
    var writeRow = writeSheet.getLastRow() + 1;
    var desc = '=D' + writeRow + '&", "&F' + writeRow + '&", "&E' + writeRow + '&", "&G' + writeRow + '&", "&H' + writeRow;
    Logger.log('write: %s; v: %s; v3: %s, v4: %s, v2: %s,', writeRow,v,v3,image,v2);
    
    // ToDo: Get columns dynamicly
    writeSheet.getRange(writeRow,15,1,1).setValue(currency);
    writeSheet.getRange(writeRow,11,1,1).setValue(shipping*qtys);
    writeSheet.getRange(writeRow,9,1,2).setValues(v2);
    writeSheet.getRange(writeRow,12,1,2).setValues(v3);
    writeSheet.getRange(writeRow,4,1,5).setValues(v);
    writeSheet.getRange(writeRow,2,1,1).setValues(image);
    // Set sheet formulas
    writeSheet.getRange(writeRow,3,1,1).setFormula(desc);
    var cr2 = writeSheet.getRange(writeRow+1,18,1,1).getValue();
    writeSheet.getRange(writeRow,18,1,1).setValue(cr2);
    writeSheet.getRange(writeRow,19).setValue(purchaseDate);

    var nFormula = '=J' + writeRow + '/I' + writeRow;
    var pFormula = '=K' + writeRow + '/I' + writeRow;
    var qFormula = '=N' + writeRow + '+P' + writeRow;
    // var conRate = '=IFS(O'+writeRow+'="Pesos",GOOGLEFINANCE("CURRENCY:MXNUSD"),O'+writeRow+'="Dollars",1)';
    var conRate = 'GOOGLEFINANCE("CURRENCY:MXNUSD")';

    writeSheet.getRange(writeRow,14).setFormula(nFormula);
    writeSheet.getRange(writeRow,16).setFormula(pFormula);
    writeSheet.getRange(writeRow,17).setFormula(qFormula);
    writeSheet.getRange(writeRow,18).setFormula(conRate);
    // writeSheet.getRange(writeRow,18).setValue(writeSheet.getRange(writeRow,18).getValue());

    var cRateVal = writeSheet.getRange(writeRow,18).getValue();
    conRate = '=IFS(O'+writeRow+'="Pesos",'+cRateVal+',O'+writeRow+'="Dollars",1)'
    writeSheet.getRange(writeRow,18).setFormula(conRate);
  }

  clearForm(false,sheetInfo);
}
