const express = require('express');
const router = express.Router();

const moviesHandler = require('./handler/movies')

const verifyToken = require('../middleware/authMiddleware');

router.get('/', moviesHandler.movies);
router.get('/playing-now', moviesHandler.playingNow);
router.get('/coming-soon', moviesHandler.comingSoon);
router.post('/', verifyToken, moviesHandler.create);
router.put('/:id', verifyToken, moviesHandler.update);
router.get('/:id', moviesHandler.movie);
router.delete('/:id', verifyToken, moviesHandler.destroy);

module.exports = router;
