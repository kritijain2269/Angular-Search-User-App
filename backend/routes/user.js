const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const check_auth = require('../auth/check-auth');

router.get('/users', check_auth, user_controller.all_user_list_get);
router.get('/user/:name', check_auth, user_controller.user_list_get);


module.exports = router;
