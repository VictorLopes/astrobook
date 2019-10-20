var express = require('express');
var router = express.Router();
var UserModel = require('../model/User.model');

var user = new UserModel();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.json('');
});


/**
 * ENDPOINT: localhost:3000/users/insert
 * POST: Insert a new user.
 * @example
 {
   "name": "Test",
   "lastName": "Test2",
   "nickname": "Testal",
   "email": "test@test.com",
   "password": "123",
   "profilePhoto": "example.jpg"
 }
 */
router.post('/insert', async (req, res, next) => {
  let body =  req.body;
  let result = await user.insert(body);
  res.json(result);
});

/**
 * ENDPOINT: localhost:3000/users/login
 * POST: Makes login. (nickname or email and password)
 * @example
 {
   "username": "Test",
   "password": "1234"
 }
 */
router.post('/login', async (req, res, next) => {
  let body =  req.body;
  let result = await user.login(body);
  res.json(result);
});




module.exports = router;
