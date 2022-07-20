var express=require('express');
var path = require('path');
const router = require('./router.js')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
const session = require('express-session')

var app=express()
app.engine('html', require('express-art-template'));
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// app.get('/',function(req,res){
//     res.render('留言板.html')
// }).

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)
app.listen(5000,function(){
    console.log('服务器启动');
})
