const {Movies} = require('../../../models');

module.exports = async(req, res) => {
    
    const search = req.query.name || [];

    const sqlOptions = {
        attributes : ['id', 'name', 'poster', 'status', 'rating']
    }

    if(search.length){
        sqlOptions.where = {
            status : 'ongoing',
            name : {
                $like : `%${search}%`
            }
        }
    }
    
    const user = await Movies.findAll(sqlOptions);

    return res.json({
        status : 'success',
        data : user
    })
}