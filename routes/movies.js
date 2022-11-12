const express = require('express');
const router = express.Router();

const moviesHandler = require('./handler/movies')

router.get('/', moviesHandler.index);
router.post('/', moviesHandler.create);
router.put('/:id', moviesHandler.update);
router.get('/:id', moviesHandler.show);
router.delete('/:id', moviesHandler.delete);

module.exports = router;
