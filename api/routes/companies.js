/**
 * @swagger
 * /companies:
 *   get:
 *     tags:
 *       - Companies
 *     name: Find companies
 *     summary: Return all registered companies
 *     description: Return all registered companies. Protected endpoint. When you try out this API Swagger will automatically attach the Authentication header using the Bearer token you provided in the Authorize dialog.
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
 *         description: List of registered companies (companyName, companyId, endpoint)
 *       '403':
 *         description: Forbidden to access this resource
 *       '500':
 *         description: Internal Server Error
 */