const {Cast, Movies} = require('../../../models');
const moment = require('moment');

module.exports = async(req, res) => {
    
    const search = req.query.search || [];

    const sqlOptions = {
        attributes : ['id', 'name', 'avatar', 'birthday', 'deadday'],
        include : [{
            model : Movies,
            as: 'movies',
            attributes : ['id', 'name', 'poster', 'status', 'rating'],
            through: {
                attributes: [],
            }
        }]
    }

    if(search.length){
        sqlOptions.where = {
            name : {
                $like : `%${search}%`
            }
        }
    }
    
    const cast = await Cast.findAll(sqlOptions);

    

    return res.json({
        status : 'success',
        data : cast.map(v => {
            v.avatar ? v.avatar = `${req.headers.host}${v.avatar}` : null
            v.birthday ? v.birthday = moment(v.birthday).format('LLL') : null
            v.deadday ? v.deadday = moment(v.deadday).format('LLL') : null

            v.movies.map(movie => {
                movie.poster ? movie.poster = `${req.headers.host}${movie.poster}` : null
            })
        })
    })
}