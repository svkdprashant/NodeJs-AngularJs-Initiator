const models = require('../../models');
const CryptoJS = require("crypto-js");
const CONF = require('../../config/config');
const jwt = require('jsonwebtoken');
const constant = require('../constants');
/**
 * Function to validate admin credentials
 */
function validateAdminCredentials(email, password, res) {
    return new Promise(function (resolve, reject) {
        let users = models.users;
        users.findOne({
            where: {
                email: email,
                user_type: 'ADMIN'
            },
        }).then(user => {
            if (user) {

                if (user.password != CryptoJS.MD5(password).toString()) {
                    reject(res.__('ERROR_INCORRECT_PASSWORD'));
                }

                if (user.is_active == constant.NO) {
                    reject(res.__('ERROR_INACTIVATED'))
                }

                jwt.sign({id: user.id, email: user.email}, CONF.admin_jwt_key, { expiresIn: "1d" }, (err, token) => {
                    if (err) {
                        reject("Error in generating JWT Token.")
                    } else {
    
                        var loggedInUser = {
                            email: user.email, 
                            firstname: user.firstname, 
                            lastname: user.lastname,
                            token: token
                        };
    
                        resolve(loggedInUser)
                    }
                });

            } else {
                reject(res.__('ERROR_ADMIN_EMAIL_NOT_EXISTS'));
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function getUsers() {
    return new Promise(function (resolve, reject) {
        let users = models.users;
        users.findAll({
            attributes: ['id', 'email', 'firstname', 'lastname', 'mobile', 'dob','is_active'],
            where: {
                is_active: constant.YES,
                user_type: 'USER'
            },
        }).then(user => {
            resolve(user);
        }).catch(err => {
            reject(err);
        });
    })
}

module.exports = {
    _validateAdminCredentials: validateAdminCredentials,
    _getUsers: getUsers
};