/**
 * Config files
 * @author Prashant Jethwa
 */

const env = process.env.NODE_ENV || 'development';
const ENV_CONFIG = require(__dirname + '/config.json')[env];

// These are the variables which are not depend on environment.
const CONFIG = {

    jwt_key: "SH2xrzblb6XGEs0d6eXMDkTSNOyQpIRs",
    admin_jwt_key: "Ue19sgIcpWJzqX5K590VFGqDk7nob9vC",
    environment: env
}

// Combine static config and dynamic config variables
const combine_config = {...CONFIG, ...ENV_CONFIG}

module.exports = combine_config