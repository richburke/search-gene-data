'use strict';

var fs = require('fs');
var mysql = require('mysql');
var moment = require('moment');

var conn = mysql.createConnection({
  host: 'localhost',
  database: 'genedata',
  user: 'simons',
  password: '$1m0n$'
});

function insertRecords(conn, records) {
  conn.connect();

  for (var i=0; i < records.length; i++) {
    var record = records[i];
    var insert =
      'INSERT into getdata_gene ' +
      '(name, chrom, txEnd, txStart, created) ' +
      'VALUES (' +
        '"' + record.name + '", ' +
        '"' + record.chrom + '", ' +
        record.txEnd + ', ' +
        record.txStart + ', ' +
        '"' + moment().format('YYYY-MM-DD HH:mm:ss') + '"' +
      ')';

    conn.query(insert);
  }

  conn.end();
}

fs.readFile('refGeneData.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var json = JSON.parse(data);
  insertRecords(conn, json.results);
});
