var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'dbms',
  database:'Test'
});
con.connect(function(err){
  if(err) throw err;
  console.log('Connected');
  con.query('select * from Student',function(err,result,fields){
    if(err) throw err;
    console.log(result);
  })
});
