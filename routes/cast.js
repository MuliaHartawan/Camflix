const express = require('express');
const router = express.Router();

const castHandler = require('./handler/cast')

router.get('/', castHandler.casts);
router.post('/', castHandler.create);
router.put('/:id', castHandler.update);
router.get('/:id', castHandler.cast);
router.delete('/:id', castHandler.destroy);

module.exports = router;
