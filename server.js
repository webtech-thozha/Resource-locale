'use strict'
var XLSX = require('xlsx')
var workbook = XLSX.readFile('bu-bu.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const fs = require('fs');
var rawdata = fs.readFileSync('sample_template.json');  
var obj = JSON.parse(rawdata);  

traverseObject(obj);

function traverseObject(obj) {
    for(var elem in obj) {
        if(typeof obj[elem] == 'string') {
            searchTextInExcel(obj, elem);
        } else {
            traverseObject(obj[elem]);
        }
    }  
}


fs.writeFileSync('output.json', JSON.stringify(obj));



function searchTextInExcel(obj, elem) {
    for(var i = 0; i < xlData.length; i++) {
        if(xlData[i]['English Text to Be Translated'].toLowerCase() == obj[elem].toLowerCase())
            obj[elem] = xlData[i]['Bulgarian'];    
    }
}
