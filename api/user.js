const express = require('express');
const router = express.Router();

const verifyApiToken = require('../modules/auth/apiTokenAuthentication')
const verifyBearerToken = require('../modules/auth/authentication')
const response = require('../modules/response');
const user_operations = require('../modules/operations/users_operations');

/**
 * Middleware to verify api token.
 * Another middleware to verify bearer token
 */
router.use(verifyApiToken);
router.use(verifyBearerToken);

router.get('/', function(req, res, next) {
    return response.success(res, "");
});

//
// Get user detail
//
router.get('/getUserDetail', function(req, res, next) {
    const user_id = req.query.user_id

    if (!user_id) {
        return response.error(res, res.__('ERROR_INVALID_USER_ID'))
    }

    user_operations._getUserDetail(user_id).then((user_detail)=>{
        return response.success(res, user_detail)
    }).catch(err=>{
        return response.error(res, err)
    });
});

router.post('/updateUserDetail', function(req, res, next) {

    let user_id = req.body.user_id;
    let firstname = req.body.firstname;

    if (!user_id) {
        return response.error(res, res.__('ERROR_INVALID_USER_ID'))
    }

    if (!firstname) {
        return response.error(res, res.__('ERROR_VALID_FIRST_NAME'))
    }

    user_operations._updateUserDetail(req, res).then((user)=>{
        return response.success(res, user)
    }).catch(err=>{
        return response.error(res, err)
    });
});

module.exports = router;
