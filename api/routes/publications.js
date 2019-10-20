var express = require('express');
var router = express.Router();
var PublicationModel = require('../model/Publication_model');

var publication = new PublicationModel();

router.get('/', async(req, res, next) => {
  publication.get(1);
  res.json('aqui');
});

/**
 * ENDPOINT: localhost:3000/publications/insert
 * POST: Insert a new publication.
 * @example
 {
   "title": "Test",
   "description": "Test2",
   "cover": "Testal.png",
   "photos": ['photo1.png', 'photo2.png', 'photo3.png']
 }
 */
router.post('/insert', async (req, res, next) => {
  let body = req.body;
  let result = await publication.insert(body);
  res.json(result);
});

module.exports = router;
