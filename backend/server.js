'use strict';
// Module Dependencies
// -------------------
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
// SET STORAGE
app.use('/', express.static(`${__dirname}/app`));
// Configure Express
app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/public/`);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
// Express in Development Mode
app.use(require("./routes/index.Routes"));
http.createServer(app).listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`);
});