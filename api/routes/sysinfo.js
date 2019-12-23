const express = require('express');
const httpreq = require('request');
const pug = require('pug');
const bodyParser = require('body-parser');
const os = require('os');

const sysInfoRouter = express.Router();


sysInfoRouter.route('/')
.get((req, res, next) => {
    httpreq(
        {uri : 'http://localhost:5577/restv2/Server',
        method : 'GET',
        timeout : 2000
    }
    ,function(error,response,body)
    {
        if (!error && response.statusCode==200)
        {
            console.log(body);
            pug.renderFile('./views/sysinfo.pug', { status : 'ok'});
            // res.render('sysinfo', { title: "Login" });
            // compiledFunction({
            //     status : body
            // });
            res.render('sysinfo',{status : body});
            //res.send(body);
        }
    }).on('error', function(err){
        console.log(err);
        res.send(err);
    });   
    
    // res.send(strStatus);
});

module.exports = sysInfoRouter;