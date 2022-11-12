const express = require('express');
const router = express.Router();

const moviesHandler = require('./handler/movies')

router.get('/', moviesHandler.movies);
router.post('/', moviesHandler.create);
router.put('/:id', moviesHandler.update);
router.get('/:id', moviesHandler.movie);
router.delete('/:id', moviesHandler.destroy);

module.exports = router;
