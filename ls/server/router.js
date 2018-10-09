"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var con = mysql.createConnection({
host: 'localhost',
user:'root',
password:'dbms',
database:'Test'
});
const app1 = express();
var router = express.Router();
router.get('/',function(req,res){
  res.send("Lead Semantics Home page");
});
router.get('/about',function(req,res){
  res.send("About Leadsemantics")
});
router.get('/contact',function(req,res){
  res.send('Cyber Towers..');
});
app1.use(bodyParser.urlencoded({extended: false}));
app1.use(bodyParser.json());
router.post('/select',function(req,res)
{
  console.log('yes');
  let body='';
  req.on('data', chunk => {
     body += chunk.toString(); // convert Buffer to string
 });
 req.on('end', () => {
     var data=body;
     console.log(data);
    //select_query(data);
    var str_v =data.split(',');

        con.query("SELECT "+str_v[0]+","+str_v[1]+" FROM east", function (err, result)
        {
            if (err) throw err;
            console.log(result);
            res.send(result);
            res.end("okkkkk");
        });

 });
});
router.post('/data',function(req,res)
{
    let body = '';
    req.on('data', chunk => {
       body += chunk.toString(); // convert Buffer to string
   });
   req.on('end', () => {
       var data=JSON.parse(body);
       working(data);
       res.end("Hello");
   });
});
function select_query(str_value)
{

}
function working(dataTypes){
  con.connect(function(err)
  {
    if(err) throw err;
    console.log('Connected');
    var predefind="CREATE TABLE"+" " +"east"+"(";
  		for(var key in dataTypes)
  		{
  			if(!dataTypes[key].localeCompare("varchar"))
  			{
  				predefind +=key+" "+dataTypes[key]+"("+50+")"+",";
  			}
  			else{	predefind +=key+" "+dataTypes[key]+","; }

  		}
  		predefind = predefind.slice(0, -1);
  		predefind +=");";
      console.log(predefind);
      con.query(predefind,function(err,result,fields){
      if(err) throw err;
      console.log(result);
    });
    var load = "load data local infile '/home/mohan/Desktop/ls/server/temp/temp.csv' into table east fields terminated by ',' lines terminated by '\n' ignore 1 rows;";
    con.query(load,function(err,result,fields){
     if(err) throw err;
     console.log(result);
    });
  });
}
module.exports = router;
