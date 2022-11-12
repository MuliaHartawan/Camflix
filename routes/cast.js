const express = require('express');
const router = express.Router();

const castHandler = require('./handler/cast')

const verifyToken = require('../middleware/authMiddleware');

router.get('/', castHandler.casts);
router.post('/', verifyToken, castHandler.create);
router.put('/:id', verifyToken, castHandler.update);
router.get('/:id', castHandler.cast);
router.delete('/:id', verifyToken, castHandler.destroy);

module.exports = router;
