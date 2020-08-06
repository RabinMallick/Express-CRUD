const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const path = require('path');
const expressSession = require('express-session');

// view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use('/',users);

var port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Express server is runnig at port no : ${port}`));