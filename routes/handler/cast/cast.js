const {Cast} = require('../../../models');

module.exports = async(req, res) => {
    const id = req.params.id;

    const cast = await Cast.findByPk(id, {
        attributes : ['id', 'name', 'avatar', 'birthday', 'deadday']
    });

    if(!cast){
        return res.status(404).json({
            status : 'error',
            message : 'cast not found'
        });
    }

    return res.json({
        status : 'success',
        data : cast
    })
}