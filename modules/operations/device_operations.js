/**
 * Database operations forum table
 * @author Prashant Jethwa
 */

const models  = require('../../models');

/**
 * Function to validate forum credentials
 */
function create(users_id, deviceObj) {
    return new Promise(function (resolve, reject) {
        let user_devices = models.user_devices;

        user_devices.findOne({
            where: {
                users_id: users_id,
                device_id: deviceObj.device_id
            },
        }).then((device) => {
            if (device) {
                update(device.id, deviceObj).then((devices) => {
                    resolve(devices);
                }).catch(err => {
                    reject(err);
                });
            } else {
                user_devices.create({
                    users_id: users_id,
                    device_id: deviceObj.device_id,
                    device_token: deviceObj.device_token,
                    os_type: deviceObj.os_type,
                    model: deviceObj.model,
                    app_version: deviceObj.app_version,
                    os_version: deviceObj.os_version,
                    latitude: deviceObj.latitude,
                    longitude: deviceObj.longitude
                }).then(devices => {
                    resolve(devices);
                }).catch(err => {
                    reject(err);
                });
            }

        });

    });
}

function update(device_id, deviceObj) {
    return new Promise(function (resolve, reject) {
        let user_devices = models.user_devices;

        user_devices.update({ 
                device_token: deviceObj.device_token,
                os_type: deviceObj.os_type,
                model: deviceObj.model,
                app_version: deviceObj.app_version,
                os_version: deviceObj.os_version,
                latitude: deviceObj.latitude,
                longitude: deviceObj.longitude
            }, 
            { where: { id: device_id } }).then(device => {
                resolve(deviceObj);
        }).catch(err => {
            reject(err);
        });

    });
}

module.exports = {
    _create: create
};