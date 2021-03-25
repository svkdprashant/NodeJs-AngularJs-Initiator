const constants = require('./constants');

function success(res, data = {}) {
    return res.status(200)
            .send({
                    "status": true, 
                    "data": data, 
                    "error_code": 200, 
                    "error_message": ''
                });
}

function error(res, errorMessage = '', errorCode = constants.ERRCODE_BADREQUEST) {
    return res.status(200)
            .send({
                    "status": false, 
                    "data": {}, 
                    "error_code": errorCode, 
                    "error_message": errorMessage
                });
}

function admin_success(res, data = {}) {
    return res.status(200)
            .send(data);
}

function admin_error(res, errorMessage = '', errorCode = constants.ERRCODE_BADREQUEST) {
    return res.status(errorCode)
            .send(errorMessage);
}

module.exports = {
    success: success,
    error: error,
    admin_success: admin_success,
    admin_error: admin_error
};
