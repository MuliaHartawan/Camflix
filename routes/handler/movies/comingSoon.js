const {Movies} = require('../../../models');
const { Op } = require('sequelize'); 

module.exports = async(req, res) => {
    
    const search = req.query.search;

    const sqlOptions = {
        attributes : ['id', 'name', 'poster', 'status', 'rating'],
        where : {
            status : 'ongoing'
        }
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
            return { id : v.id, name : v.name, poster : v.poster ? `${req.get('host')}/${v.poster}` : null, status : v.status, rating : v.rating}
        })
    })
}