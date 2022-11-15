const {Movies, Cast} = require('../../../models');
const moment = require('moment');
const { Op } = require('sequelize'); 

module.exports = async(req, res) => {
    
    const search = req.query.search;

    const sqlOptions = {
        attributes : ['id', 'name', 'poster', 'status', 'rating'],
        include : [{
            model : Cast,
            as: 'cast',
            attributes : ['id', 'name', 'avatar', 'birthday', 'deadday'],
            through: {
                attributes: [],
            }
        }]
    }

    if(search){
        sqlOptions.where = {
            name : {
                [Op.like]: `%${search}%`
            }
        }
    }
    
    const movie = await Movies.findAll(sqlOptions);

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