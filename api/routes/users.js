var express = require('express');
var router = express.Router();
var UserModel = require('../model/User.model');

/* GET users listing. */
router.get('/', function (req, res, next) {

  let user = new UserModel();
  user.insert({
    name: 'Teste',
    lastName: 'Teste2',
    email: 'teste@teste.com',
    password: '123',
    profilePhoto: 'exemplo.jpg'
  });
  
  res.send('Ok');

  /* userSchema.methods.findSimilarTypes = function (cb) {
    return this.model('Animal').find({ type: this.type }, cb);
  }; */
});

module.exports = router;
