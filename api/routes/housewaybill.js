const express = require('express');
const bodyParser = require('body-parser');

const hwbRouter = express.Router();

hwbRouter.use(bodyParser.json());

/**
 * @swagger
 * /housewaybill:
 *   get:
 *     tags:
 *       - HousewayBill
 *     name: Update housewaybill
 *     summary: Update housewaybill
 *     description: Update housewaybill. Protected endpoint. When you try out this API Swagger will automatically attach the Authentication header using the Bearer token you provided in the Authorize dialog.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
*     parameters:
 *       - in: header
 *         name: serverSecret
 *         description: Server specific key from the server's configuration file.
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: HousewayBill updated.
 *       '403':
 *         description: Forbidden to access this resource
 *       '500':
 *         description: Internal Server Error
 */

hwbRouter.route('/')
.options(cors.cors, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    res.sendStatus(200);
//   if (req.headers.serversecret === config.serverOwnSecret) {
//     Company.find({})
//       .then((companies) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         var i = companies.length;
//         var out = [];
//         while (i--) {
//           out[i] = {
//             "companyName": companies[i].companyName,
//             "companyId": companies[i].companyId,
//             "endpoint": companies[i].serverInformationEndpoint
//           }
//         }
//         res.json(out);
//       }, (err) => next(err))
//       .catch((err) => next(err));

//   } else {
//     utils.createError(res, 403, 'Forbidden to retrieve registered companies on this server');
//   }
});