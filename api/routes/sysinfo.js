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
 *       - text/htmlnpm 
 *     responses:
 *       '200':
 *         description: Shows system information.
 *       '403':
 *         description: Forbidden to access this resource
 *       '500':
 *         description: Internal Server Error
 */


import { Router } from 'express';
import httpreq from 'request';
import { MongoClient } from 'mongodb';
var url = "mongodb://localhost:27017/";
import pug from 'pug';
import bodyParser from 'body-parser';
import os from 'os';

const sysInfoRouter = Router();


var dbresults;
var jsonstr;
sysInfoRouter.route('/')
.get((req, res) => {
    var errstat='unknown error occured!';
    MongoClient.connect(url, {
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    }, function(err, db) {
        if (err) {
            res.render('sysinfo',{dberr : 'db error ' + err});
        }
        else {
            var dbo = db.db("bpms");
            var query = {"sysinfo.hosts.type":"IS"};
            dbo.collection("configurations").find(query).toArray(function(err, result) {
                if (err) throw err;          
                jsonstr=JSON.stringify(result);
                dbresults=[].concat(result);
            });
            db.close();
            }
        });
            if (!Array.isArray(dbresults) || !dbresults.length)
            {
                console.log('unable to get data');
                res.render('sysinfo',{err : " dbresults is  null"});
            }
            // else
            // {
            //     console.log('checking...');
            //     var i=0;
            //     dbresults.forEach(element => {
            //         console.log('Getting server status for ' + element.sysinfo.hosts.name);
            //         i++;
            //         httpreq(
            //             {
            //                 uri : 'http://' + element.sysinfo.hosts.name + ':5577/restv2/Server',
            //                 method : 'GET',
            //                 timeout : 2000
            //             }
            //             ,function (error, response, body) {
            //                 if (!error && response.statusCode == 200) {
            //                     element.sysinfo.hosts.status = 'ONLINE';
            //                     console.log('Server status for ' + element.sysinfo.hosts.name + ' is STARTED');
            //                 }
            //             }).on('error', function(err)
            //             {                            
            //                 element.sysinfo.hosts.status = 'OFFLINE';
            //                 console.log('Server status for ' + element.sysinfo.hosts.name + ' is OFFLINE');
            //                 console.log(err);
            //                 errstat=err.message;
            //                 // res.render('sysinfo',{err : JSON.stringify(err.statusCode)});
            //             });
            //             console.log('element is : ' + JSON.stringify(element));
            //         // console.log(i);                    
            //         //  return errstat;
            //         });
            //         if (Array.isArray(dbresults) && dbresults.length)
            //         {
            //             console.log('rendering...');
            //             // console.log(JSON.stringify(errstat));
            //             // dbresults[0].sysinfo.hosts.status='fail';                        
            //             // res.render('sysinfo',{dbresults : dbresults});
            //         }
            // }
            // console.log("errstat " + JSON.stringify(errstat));

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



export default sysInfoRouter;