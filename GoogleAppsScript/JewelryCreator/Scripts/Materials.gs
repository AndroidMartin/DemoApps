var materialsSheetName = 'Materials';
var materialEntryForm = 'Entry Form - Materials';

function buttonClearMaterials(){
  var sheetInfo = sheetVariables('MATERIALS'); // ToDo: pass sheet name instead of type
  clearForm(true,sheetInfo);
}

function buttonAddMaterial() {
  var sheetInfo = sheetVariables('MATERIALS'); // ToDo: call active ranges by sheet names above, given type passed
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

  var response = ui.alert("Are you sure you're ready to submit this order?",ui.ButtonSet.YES_NO);
  if (!(response == 'YES')){
    ss.toast('Materials NOT submitted.','Operation Cancelled');
    return;
  }

// BEGIN RUNNING SCRIPT
  var sheetInfo = sheetVariables('MATERIALS');

  // Get data entered into form
  var totalData = ss.getSheetByName(materialEntryForm).getRange(sheetInfo.listStartCell.getRow(),sheetInfo.listStartCell.getColumn(),sheetInfo.numberOfItems,sheetInfo.listNumCol).getValues();
  Logger.log('Total Data: ' + totalData);

  // Get destination data
  var writeSheet = ss.getSheetByName(materialsSheetName);
  var writeHeaders = writeSheet.getRange(1,1,1,writeSheet.getLastColumn()).getValues();
  writeHeaders = writeHeaders[0];
  var writeRow = writeSheet.getLastRow()+1;
  var writeRange = writeSheet.getRange(writeRow,1,sheetInfo.numberOfItems,19);
  var writeData = writeRange.getValues();

  for (i=0;i<sheetInfo.numberOfItems;i++) {
    // Create entry values as an object
    var item = {
      picture : totalData[i][0],
      cost : totalData[i][1],
      quantity : totalData[i][2],
      manufacturer : totalData[i][3],
      type : totalData[i][4],
      material : totalData[i][6],
      color : totalData[i][7],
      size : totalData[i][8],
      shape : totalData[i][9],
    }
    Logger.log('Item Data: %s',item);

    // Assign values to write array
    writeData[i][writeHeaders.indexOf('ID')] = writeRow+i;
    writeData[i][writeHeaders.indexOf('Picture')] = item.picture;
    writeData[i][writeHeaders.indexOf('Item')] = item.type;
    writeData[i][writeHeaders.indexOf('Material')] = item.material;
    writeData[i][writeHeaders.indexOf('Color')] = item.color;
    writeData[i][writeHeaders.indexOf('Size')] = item.size;
    writeData[i][writeHeaders.indexOf('Shape')] = item.shape;
    writeData[i][writeHeaders.indexOf('Qty')] = item.quantity;
    writeData[i][writeHeaders.indexOf('Cost')] = item.cost;
    writeData[i][writeHeaders.indexOf('Shipping')] = sheetInfo.shippingTotal; // ToDo: Figure how you want to calculate shipping
    writeData[i][writeHeaders.indexOf('Supplier')] = sheetInfo.supplier;
    writeData[i][writeHeaders.indexOf('Manufacturer')] = item.manufacturer;
    writeData[i][writeHeaders.indexOf('Currency')] = sheetInfo.currency;
    writeData[i][writeHeaders.indexOf('Date Recieved')] = sheetInfo.datePurchased;
    // [ID, Picture, Desc, Item, Material, Color, Size, Shape, Qty, Cost, Shipping, Supplier, Manufacturer, Cost/Unit, Currency, Ship/Unit, Cost w/ Ship, Conv Rate, Date Recieved]
    //  0     1       2     3       4       5      6      7     8     9      10        11          12          13         14         15           16          17          18  (ArrayLocations)
    //  1     2       3     4       5       6      7      8     9    10      11        12          13          14         15         16           17          18          19  (ColumnNumbers)
  }

  // Write Values to Sheet
  writeRange.setValues(writeData);

  // Handle Formulas
  var desc;
  var costPerUnit;
  var shippingPerUnit;
  var costWithShipping;

  // Set conversion rate at time of entry
  var conRange = writeSheet.getRange(writeRow,18);
  var conFormula = 'GOOGLEFINANCE("CURRENCY:MXNUSD")';
  conRange.setFormula(conFormula);
  var conRate = conRange.getValue();

  for (i=0;i<sheetInfo.numberOfItems;i++) {
    // Set Formulas - NEEDS UPDATING IF COLUMN STRUCTURE CHANGES
    writeRow = writeRow + i;
    desc = '=D' + writeRow + '&", "&F' + writeRow + '&", "&E' + writeRow + '&", "&G' + writeRow + '&", "&H' + writeRow;
    conFormula = '=IFS(O'+writeRow+'="Pesos",'+conRate+',O'+writeRow+'="Dollars",1)'
    costPerUnit = '=J' + writeRow + '/I' + writeRow;
    shippingPerUnit = '=K' + writeRow + '/I' + writeRow;
    costWithShipping = '=N' + writeRow + '+P' + writeRow;

    // Write Formulas
    writeSheet.getRange(writeRow,writeHeaders.indexOf('Description')).setFormula(desc);
    writeSheet.getRange(writeRow,writeHeaders.indexOf('Cost/Unit')).setFormula(costPerUnit);
    writeSheet.getRange(writeRow,writeHeaders.indexOf('Ship/Unit')).setFormula(shippingPerUnit);
    writeSheet.getRange(writeRow,writeHeaders.indexOf('Cost w/ Ship')).setFormula(costWithShipping);
    writeSheet.getRange(writeRow,writeHeaders.indexOf('Conv Rate')).setFormula(conFormula);
  }

  clearForm(false,sheetInfo);
}
