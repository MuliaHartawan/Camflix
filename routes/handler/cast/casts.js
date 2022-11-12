const {Cast} = require('../../../models');

module.exports = async(req, res) => {
    
    const search = req.query.name || [];

    const sqlOptions = {
        attributes : ['id', 'name', 'avatar', 'birthday', 'deadday']
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
        data : cast
    })
}