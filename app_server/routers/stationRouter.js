var express = require('express');
var router = express.Router();
var ctrlStation = require('../controller/stationController');

router.get('/', ctrlStation.indexGet);
router.post('/', ctrlStation.indexPost);

module.exports = router;