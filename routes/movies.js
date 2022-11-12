const express = require('express');
const router = express.Router();

const moviesHandler = require('./handler/movies')

router.get('/', moviesHandler.movies);
router.get('/playing-now', moviesHandler.playingNow);
router.get('/coming-soon', moviesHandler.comingSoon);
router.post('/', moviesHandler.create);
router.put('/:id', moviesHandler.update);
router.get('/:id', moviesHandler.movie);
router.delete('/:id', moviesHandler.destroy);

module.exports = router;
