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
    
    const user = await Movies.findAll(sqlOptions);

    return res.json({
        status : 'success',
        data : user
    })
}