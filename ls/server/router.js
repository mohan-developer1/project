var express = require('express');
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
module.exports = router;
