const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');

const users = require('./routes/api/users');
const customers = require('./routes/api/customers');

// view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// Routes
app.use('/',users);
app.use('/customers', customers);

var port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Express server is runnig at port no : ${port}`));