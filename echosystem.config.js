module.exports = {
    apps : [
        {
            name: "nodejs-angularjs-initiator",
            script: "./index.js",
            watch: true,
            env_test: {
                "PORT": 8000,
                "NODE_ENV": "test"
            },
            env_test_secure: {
                "PORT": 443,
                "NODE_ENV": "test",
            },
            env_production: {
                "PORT": 443,
                "NODE_ENV": "production",
            }
        }
    ]
  }