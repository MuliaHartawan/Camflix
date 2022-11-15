const {Movies, Cast} = require('../../../models');
const moment = require('moment');

module.exports = async(req, res) => {
    const id = req.params.id;

    const movie = await Movies.findByPk(id, {
        attributes : ['id', 'name', 'poster', 'status', 'rating'],
        include : [{
            model : Cast,
            as: 'cast',
            attributes : ['id', 'name', 'avatar', 'birthday', 'deadday'],
            through: {
                attributes: [],
            }
        }]
    });

    if(!movie){
        return res.status(404).json({
            status : 'error',
            message : 'movie not found'
        });
    }
    
    return res.json({
        status : 'success',
        data : movie.map(v => {
            v.poster ? v.poster = `${req.headers.host}${v.poster}` : null

            v.cast.map(cast => {
                cast.avatar ? cast.avatar = `${req.headers.host}${cast.avatar}` : null
                cast.birthday ? cast.birthday = moment(cast.birthday).format('LLL') : null
                cast.deadday ? cast.deadday = moment(cast.deadday).format('LLL') : null
                return cast
            })

            return v
        })
    })
}