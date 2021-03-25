const express = require('express');
const router = express.Router();

const adminAuthentication = require('../modules/auth/adminAuthentication')
const response = require('../modules/response');
const admin_operations = require('../modules/operations/admin_operations');

router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const pass = req.body.password;

  if (!email) {
    return response.admin_error(res, res.__('ERROR_VALID_EMAIL'))
  }

  if (!pass) {
    return response.admin_error(res, res.__('ERROR_VALID_PASSWORD'))
  }

  admin_operations._validateAdminCredentials(email,pass, res).then((users)=>{
    return response.admin_success(res, users)
  }).catch(err=>{
    return response.admin_error(res, err)
  });

})

/**
 * Middleware to verify api token.
 */
router.use(adminAuthentication);

router.get('/users', function(req, res, next) {
  admin_operations._getUsers().then((sports)=>{
    return response.admin_success(res, sports)
  }).catch(err=>{
    return response.admin_error(res, err)
  });
})

module.exports = router;