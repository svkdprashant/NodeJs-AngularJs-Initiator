const express = require('express');
const router = express.Router();

const verifyApiToken = require('../modules/auth/apiTokenAuthentication')
const response = require('../modules/response');
const users_operations = require('../modules/operations/users_operations');
const device_operations = require('../modules/operations/device_operations');

/**
 * Middleware to verify api token
 */
router.use(verifyApiToken);

router.get('/', function(req, res, next) {
  return response.success(res, "");
});

/**
 * Simple signup API.
 * Sign up using email, firstname and password
 */
router.post('/signup', function(req, res, next) {

  const email = req.body.email;
  const firstname = req.body.firstname;
  const password = req.body.password;
  const device = req.body.device;

  if (!email) {
    return response.error(res, res.__('ERROR_VALID_EMAIL'))
  }

  if (!firstname || firstname == 'null') {
    return response.error(res, res.__('ERROR_VALID_FIRST_NAME'))
  }

  if (!password) {
    return response.error(res, res.__('ERROR_VALID_PASSWORD'))
  }

  if (device && !device.device_id) {
    return response.error(res, res.__('ERROR_DEVICE_ID'))
  }

  users_operations._create(req, res).then((user)=>{
    
    if (device) {
      
      device_operations._create(user.id, device).then((device) => {
        return response.success(res, user)
      }).catch(err=>{
        return response.error(res, err)
      });

    } else {
      return response.success(res, user)
    }
  }).catch(err=>{
    return response.error(res, err)
  });

});

/**
 * Simple login API
 * Login by email address and password
 */
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const pass = req.body.password;
  const device = req.body.device;

  if (!email) {
    return response.error(res, res.__('ERROR_VALID_EMAIL'))
  }

  if (!pass) {
    return response.error(res, res.__('ERROR_VALID_PASSWORD'))
  }

  if (device && !device.device_id) {
    return response.error(res, res.__('ERROR_DEVICE_ID'))
  }

  users_operations._validateUserCredentials(email,pass, res).then((users)=>{

    // Store device information. If device id exists then return same information
    if (device) {
        device_operations._create(users.id,device)
    }

    users_operations._generateJWTToken(users.id).then((user_token) => {
      return response.success(res, user_token)
    }).catch(err => {
      return response.error(res, err)
    });

  }).catch(err=>{
    return response.error(res, err)
  });

})

/**
 * Login by social media. Google, Facebook, or Apple
 */
router.post('/loginBySocialMedia', function (req, res) {
  const email = req.body.email;
  const firstname = req.body.firstname;
  const login_by = req.body.login_by;
  const social_id = req.body.social_id;
  const device = req.body.device;

  if (!login_by || (login_by != 'Facebook' && login_by != 'Google' && login_by != 'Apple' )) {
    return response.error(res, res.__('ERROR_LOGIN_BY'))
  }

  if (!social_id) {
    return response.error(res, res.__('ERROR_LOGIN_SOCIAL_ID'))
  }

  if (login_by != 'Apple') {
      if (!email) {
        return response.error(res, res.__('ERROR_VALID_EMAIL'))
      }
  
      if (!firstname || firstname == 'null') {
        return response.error(res, res.__('ERROR_VALID_FIRST_NAME'))
      }
  }
  
  if (device && !device.device_id) {
    return response.error(res, res.__('ERROR_DEVICE_ID'))
  }

  if (login_by == 'Apple') {
      users_operations._loginByApple(req, res).then((login_token) => {
        return response.success(res, login_token)
      }).catch(err => {
        return response.error(res, err)
      });
  } else {
      users_operations._loginBySocial(req, res).then((login_token) => {
        return response.success(res, login_token)
      }).catch(err => {
        return response.error(res, err)
      });
  }
});

module.exports = router;