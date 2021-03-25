const models = require('../../models');
const CryptoJS = require("crypto-js");
const CONF = require('../../config/config');
const jwt = require('jsonwebtoken');
const device_operations = require('./device_operations')
const constant = require('../constants')

function create(req, res) {
    return new Promise(function (resolve, reject) {
        let users = models.users;
        users.findOne({
            where: {
                email: req.body.email,
                user_type: 'USER'
            },
        }).then((user) => {
            if (user) {
                reject(res.__('ERROR_EMAIL_EXISTS'))
            }

            if (!req.body.dob) {
                req.body.dob = null;
            }

            users.create({
                email: req.body.email,
                password: CryptoJS.MD5(req.body.password).toString(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: req.body.dob,
                mobile: req.body.mobile,
                country_id: req.body.country_id
            }).then(users => {

                generateJWTToken(users.id).then((user_token) => {
                    resolve(user_token);
                }).catch(err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

/**
 * Function to validate user credentials
 */
function validateUserCredentials(email, password, res) {
    return new Promise(function (resolve, reject) {
        let users = models.users;
        users.findOne({
            where: {
                email: email,
                user_type: 'USER'
            },
        }).then(users => {
            if (users) {

                if (users.password != CryptoJS.MD5(password).toString()) {
                    reject(res.__('ERROR_INCORRECT_PASSWORD'));
                }

                if (users.is_active == constant.NO) {
                    reject(res.__('ERROR_INACTIVATED'))
                }

                resolve(users);
            } else {
                reject(res.__('ERROR_EMAIL_NOT_EXISTS'));
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function generateJWTToken(user_id) {

    return new Promise(function (resolve, reject) {

        getUserDetail(user_id).then((user) => {
            jwt.sign({id: user.id, email: user.email}, CONF.jwt_key, (err, token) => {
                if (err) {
                    reject("Error in generating JWT Token.")
                } else {

                    let loggedInUser = {
                        id: user.id,
                        email: user.email, 
                        firstname: user.firstname, 
                        lastname: user.lastname,
                        token: token,
                        card_usage: user.card_usage
                    };

                    resolve(loggedInUser)
                }
            });

        }).catch(err => {
            reject(err);
        });
    });
}

function loginByApple(req, res) {
    return new Promise(function (resolve, reject) {

        let social_id = req.body.social_id;
        let device = req.body.device;
        let email = req.body.email;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;

        let user_login_by = models.user_login_by;

        user_login_by.findOne({
            where: {
                login_by: 'Apple',
                social_id: social_id
            },
        }).then(login_by => {
            if (login_by) {

                let users = models.users;
                users.findOne({
                    where: {
                        id: login_by.users_id,
                        user_type: 'USER'
                    },
                }).then((users) => {
                    if (users) {

                        if (users.is_active == constant.NO) {
                            reject(res.__('ERROR_INACTIVATED'))
                        } else {

                            if (!email) {
                                email = users.email
                                firstname = users.firstname
                                lastname = users.lastname
                            }

                            let users_email = models.users;
                            users_email.findOne({
                                where: { email: email }
                            }).then((user_email) => {
                                
                                let user_data = {
                                    firstname: firstname,
                                    lastname: lastname
                                }

                                let user_login_id = login_by.users_id;

                                if (user_email) {
                                    user_login_id = user_email.id
                                }
                                else {
                                    user_data.email = email;
                                }

                                users.update(user_data).then((updated_users) => {
                                    // Store device information. If device id exists then return same information
                                    if (device) {
                                        device_operations._create(user_login_id,device)
                                    }
                                    
                                    generateJWTToken(user_login_id).then((token) => {
                                        resolve(token)
                                    }).catch(err => {
                                        reject(err)
                                    });
                                })

                            }).catch(err => {
                                reject(err)
                            });
                        }
                    } else {
                        reject("User not found.")
                    }
                })
            } else {

                loginBySocial(req).then((token) => {
                    resolve(token)
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            // console.log(err)
            reject(err);
        });
    })
}

function loginBySocial(req, res) {
    return new Promise(function (resolve, reject) {
        
        let login_by = req.body.login_by;
        let social_id = req.body.social_id;
        let device = req.body.device;

        createSocialUser(req, res).then((users)=>{
            if (users) {
                
                addLoginByDetail(users.id, login_by, social_id).then((login_by) => {
    
                    // Store device information. If device id exists then return same information
                    if (device) {
                        device_operations._create(users.id,device)
                    }

                    generateJWTToken(users.id).then((token) => {
                        resolve(token)
                    }).catch(err => {
                        reject(err)
                    });
                    
                }).catch(err => {
                    reject(err)
                });
            }
        }).catch(err=>{
            reject(err)
        });
    });
}

function createSocialUser(req, res) {
    return new Promise(function (resolve, reject) {
        let users = models.users;
        users.findOne({
            where: {
                email: req.body.email,
                user_type: 'USER'
            },
        }).then((user) => {
            if (user) {

                if (user.is_active == constant.NO) {
                    reject(res.__('ERROR_INACTIVATED'))
                } else {
                    resolve(user);
                }
            } else {
                users.create({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname
                }).then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject('Not able to create user.');
                    }
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function addLoginByDetail(users_id, login_by, social_id) {
    return new Promise(function (resolve, reject) {
        let user_login_by = models.user_login_by;

        user_login_by.findOne({
            where: {
                users_id: users_id,
                login_by: login_by,
                social_id: social_id
            },
        }).then((user_login) => {
            if (user_login) {
                resolve(user_login)
            } else {
                user_login_by.create({
                    users_id: users_id,
                    login_by: login_by,
                    social_id: social_id
                }).then(login_by => {
                    resolve(login_by);
                }).catch(err => {
                    // console.log(err);
                    reject(err);
                });
            }

        });

    });
}

function getUserDetail(user_id) {
    return new Promise(function (resolve, reject) {
        let users = models.users;

        users.findOne({
            attributes: ['id', 'email', 'firstname', 'lastname', 'mobile', 'dob','user_type', 'is_active'],
            where: { id: user_id, user_type: 'USER' }
        }).then((user) => {
            if (user) {
                resolve(user)
            } else {
                reject("User does not exists")
            }
        }).catch(err => {
            reject(err);
        });

    })
}

function updateUserDetail(req, res) {
    return new Promise(function (resolve, reject) {
        let user_id = req.body.user_id;

        if (!req.body.dob) {
            req.body.dob = null;
        }

        getUserDetail(user_id).then((user_detail) => {
            user_detail.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                dob: req.body.dob,
                mobile: req.body.mobile
            }).then((updated_user_detail) => {
                resolve(updated_user_detail)
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    })
}

module.exports = {
    _create: create,
    _validateUserCredentials: validateUserCredentials,
    _generateJWTToken: generateJWTToken,
    _loginByApple: loginByApple,
    _loginBySocial: loginBySocial,
    _updateUserDetail: updateUserDetail,
    _getUserDetail: getUserDetail
};