/**
 * @swagger
 * /sysinfo:
 *   get:
 *     tags:
 *       - SysInfo
 *     name: Show system information
 *     summary: Show system information and health status.
 *     description: Return system information and health. Servers infos, nodes infos, system health.
 *     produces:
 *       - text/html
 *     responses:
 *       '200':
 *         description: Shows system information.
 *       '403':
 *         description: Forbidden to access this resource
 *       '500':
 *         description: Internal Server Error
 */


const express = require('express');
const httpreq = require('request');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const pug = require('pug');
const bodyParser = require('body-parser');
const os = require('os');

const sysInfoRouter = express.Router();


var dbresults;
var jsonstr;
sysInfoRouter.route('/')
.get((req, res, next) => {
    var errstat;
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    }, function(err, db) {
        if (err) {
            console.debug(err);
            res.render('sysinfo',{dberr : err});
        }
        else {
            var dbo = db.db("bpms");
            var query = {"sysinfo.hosts.type":"IS"};
            console.debug('querying...');
            dbo.collection("configurations").find(query).toArray(function(err, result) {
                if (err) throw err;          
                jsonstr=JSON.stringify(result);
                console.log('cloning...' + JSON.stringify(jsonstr));          
                dbresults=[].concat(result);
            });
            console.log('jsonstr ' + jsonstr);
            db.close();
            if (!Array.isArray(dbresults) || !dbresults.length)
            {
                console.log('dbresults is  null.');
                res.render('sysinfo',{err : "error"});
            }
            else
            {
                var i=0;
                dbresults.forEach(element => {
                    i++;
                    httpreq(
                        {
                            uri : 'http://localhost:5577/restv2/Server',
                            method : 'GET',
                            timeout : 2000
                        }
                        ,function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                element.sysinfo.hosts.status = 'started';
                            }
                        }).on('error', function(err)
                        {                            
                            dbresults=[];
                            element.sysinfo.hosts.status='offline';
                            console.log(element);
                            errstat=err.message;
                        });
                    console.log(i);
                    return errstat;
                    });
                    if (Array.isArray(dbresults) && dbresults.length)
                    {
                        console.log('rendering...');
                        console.log(JSON.stringify(errstat));
                        // dbresults[0].sysinfo.hosts.status='fail';                        
                        res.render('sysinfo',{dbresults : dbresults});
                    }
            }
            console.log("errstat " + JSON.stringify(errstat));
        }
    });
    // if (null==dbresults)
    // {
    //     console.log('dbresults is null.');
    // }
    // if (null!=dbresults)
    // {
    //     console.log('dbresults is not null.');
    // }
//     dbresults.forEach(element => {
//     httpreq(
//         {uri : 'http://localhost:5577/restv2/Server',
//         method : 'GET',
//         timeout : 2000
//       }
//       ,function(error,response,body)
//       {
//           if (!error && response.statusCode==200)
//           {
//   element.sysinfo.hosts[0].status='started';
//   console.log('element ' + JSON.stringify(element));
//   console.log('dbresult ' + JSON.stringify(dbresults));
// }
// }).on('error', function(err)
// {
// element.sysinfo.hosts[0].status='unable to retrieve status';
// });
// });
// res.render('sysinfo',{dbresults : dbresults});
    //   console.log('dbresult ' + JSON.stringify(result));
    //   res.render('sysinfo',{dbresults : dbresults});
  
    
    // res.send(strStatus);
});



module.exports = sysInfoRouter;