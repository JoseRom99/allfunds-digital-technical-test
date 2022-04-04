const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/default-config.json');
const logger  = require('./utils/logger');

var app = express();

//Load archive routes
var news_routes = require('./routes/news.routes');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes
app.use('/api',news_routes);

//Start DB connection and server
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri)
    .then(() =>{
        logger.info("Database connection established");
        app.listen(config.port, ()=>{
            logger.info("Server running on http://localhost:" + config.port)
        })
    })
    .catch(err => logger.error(err));