var tableSort = {
 tArray : {},
 tCols  : {},
 dateCompare : function (prop,sortOrder) {
	return function(a,b) {
var date1 = new Date(a[prop]);
var date2 = new Date(b[prop]);

return sortOrder*((date1>date2)?1:-1);};
},
strCompare : function(prop,sortOrder) {
	return function(a,b) {return sortOrder*a[prop].localeCompare(b[prop]);};
},
numCompare : function (prop,sortOrder) {
	return function(a,b) {return sortOrder*(a[prop] - b[prop]);};
},
sortBy : function (arr,prop,sortOrder) {
   var firstValue = arr[0][prop],cmprtr;
   if(!firstValue)
        return null;
   
   if(!isNaN(firstValue)) {
	  cmprtr = this.numCompare;
   } 
   else if(!isNaN(Date.parse(firstValue))) {
          cmprtr = this.dateCompare;
   }
   else {
	  cmprtr = this.strCompare;
   }
   return arr.sort(cmprtr(prop,sortOrder));
},

sortTableBy:function  (prop,tableId) {
  var sortOrder=1, elm =event.target,thisTable= this.tArray[tableId],nCols=0,i,j,column,currentRecord,currentTableRow;
  var rows= document.getElementsByTagName("table")[tableId].rows;
  var nRows =rows.length;
  
 if(elm.dataset.sortorder) { 
   sortOrder = parseInt(elm.dataset.sortorder);
   elm.dataset.sortorder = sortOrder==1?-1:1;
 } else {
   sortOrder = 1;
   elm.dataset.sortorder =-1;
 }
  
  thisTable =this.sortBy(thisTable,prop,sortOrder);
   
  thisTableCols = this.tCols[tableId];
   
  nCols = thisTableCols.length;

  for(i=1;i<nRows;i++) {
	  currentRecord = rows[i];
	  currentTableRow = thisTable[i-1];
     for(j=0;j<nCols;j++)  {
	   column = thisTableCols[j];
       currentRecord.cells[j].innerText = currentTableRow[column];
     }
    
  }
  
},

init : function () {

    var tables =  document.getElementsByTagName("table");

    var k= 0,nTables = tables.length,thisTableCols;

    for(k=0;k<nTables;k++) {

	this.tCols[k] = [];
    this.tArray[k] = [];
    var rows= tables[k].rows;
   
    var tRow = {},i,j;
    var nRows = rows.length, nCols;
    if(nRows > 0 ) {
        nCols = rows[0].cells.length;    
        for(j=0;j<nCols;j++) {
            column = rows[0].cells[j].innerText;
            tRow[column] = null;
            this.tCols[k].push(column);
        }
       
    } else return;
    
	thisTableCols = this.tCols[k];
    for(i=1;i<nRows;i++) {
        tRow = {};
        currentRow = rows[i];
        for(j=0;j<nCols;j++) {
           text = currentRow.cells[j].innerText;
           tRow[thisTableCols[j]] = isNaN(text)?text:parseFloat(text);
        }

        this.tArray[k].push(tRow);
    } 

    for(i=0;i<nCols;i++) {
        rows[0].cells[i].innerHTML = "<a class=\"sort\"  href=\"#\" onclick=\"tableSort.sortTableBy('"+thisTableCols[i]+"',"+k+");\"  data-sortorder = \"1\">" + thisTableCols[i]+"</a>"
    }    
    

   }
    
}
};
