const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const uploadRouter = require('./routes/upload');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/uploaddufichier', uploadRouter);

let server = app.listen(process.env.PORT || 8000, function(){
  console.log('Listening on port ' + server.address().port)
});