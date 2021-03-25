const express = require('express');
const router = express.Router();
const fs=require("fs");
 
// Add all routes here
// Ex. router.use('/auth', require('./auth'));
fs.readdirSync(__dirname).forEach(function(file) {
    var file_name = file.split('.')[0];
    if (file !== 'index.js'){
        router.use('/' + file_name, require('./' + file_name));
    }
})
 
module.exports = router;