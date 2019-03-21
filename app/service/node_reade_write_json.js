'use strict';

const fs = require('fs');
var path = require('path');
var appRoot = path.dirname(require.main.filename);
var fileDir = appRoot + '/public/loads/mdb.json';


var memoJson = (iFile) => {
  let mdbFile,ms = 'Kiszka';

  let read = fs.createReadStream(fileDir);
  read.on('data', chunk => {
    mdbFile += chunk.toString();
  });
  read.on('end', () => {
    let cobjct = JSON.parse(mdbFile);
    let addObj = { ...cobjct, ...iFile };
    let write = fs.createWriteStream(fileDir, addObj, { flag: 'a', encoding: 'utf8' }, (err) => {
      if (err) throw err;
    });
    write.on('end', () => {
      ms = 'pelna jazda !';
      console.log('The json was writen succesfuly.');
    });
  });

  return ms;
}

var saveConvertedFileName = (iFile) => {

  const data = {};
  fs.writeFile(fileDir, data, {flag: 'a'}, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  memoJson(iFile);
}

module.exports = saveConvertedFileName;

