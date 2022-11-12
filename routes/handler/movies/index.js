const movies = require('./movies');
const movie = require('./movie');
const create = require('./create');
const update = require('./update');
const destroy = require('./delete');
const playingNow = require('./playingNow')
const comingSoon = require('./comingSoon')

module.exports = {
    movies, movie, create, update, destroy, playingNow, comingSoon
}