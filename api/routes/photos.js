var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendfile('./uploads/mitchell-luo-GjwDantzwu0-unsplash.jpg'); 
});

module.exports = router;
