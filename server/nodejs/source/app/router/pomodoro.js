const router = require('express').Router();
const controller = require('../controller');

//POMODORO
router.post('/', controller.pomodoro.start);
router.patch('/', controller.pomodoro.end);

module.exports = router;
