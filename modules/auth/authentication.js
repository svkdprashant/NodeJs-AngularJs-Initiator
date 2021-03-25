/**
 * JWT Authentication file
 * @author Prashant Jethwa
 */

const jwt = require('jsonwebtoken')
const constants = require('../constants')
const CONFIG = require('../../config/config')
const response = require('../response');


/**
 * Function to validate request with token
 */
let verifyToken = function (req, res, next) {
	const bearerHeader = req.headers['authorization'];
	if (typeof bearerHeader !== constants.UNDEFINED) {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		jwt.verify(req.token, CONFIG.jwt_key, (err, authData) => {
			if (err) {
				return response.error(res, res.__('INVALID_TOKEN'))
			} else {
				req.userId = authData.user_id;
				next()
			}
		});
	} else {
		return response.error(res, res.__('INVALID_TOKEN'))
	}
}

module.exports = verifyToken