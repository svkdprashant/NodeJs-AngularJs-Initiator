/**
 * Verify x-api-key for api authentication
 * @author Prashant Jethwa
 */

const constants = require('./../constants')
const CONFIG = require('../../config/config')
const response = require('../response');

/**
 * Function to validate request with token
 */
var verifyApiToken = function (req, res, next) {
    const api_token = req.headers['x-api-key'];
    
	if (typeof api_token !== constants.UNDEFINED && api_token === CONFIG.api_token) {
		next()
	} else {
		return response.error(res, res.__('INVALID_TOKEN'))
	}
}

module.exports = verifyApiToken