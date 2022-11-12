const express = require('express');
const router = express.Router();

const usersHandler = require('./handler/users')

const verifyToken = require('../middleware/authMiddleware');

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.post('/logout', verifyToken, usersHandler.logout);
router.put('/', verifyToken, usersHandler.update);
router.get('/', verifyToken, usersHandler.user);

module.exports = router;
