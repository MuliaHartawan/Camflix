const {Cast} = require('../../../models');

module.exports = async(req, res) => {
    const id = req.params.id;

    const cast = await Cast.findByPk(id);

    if(!cast){
        return res.status(404).json({
            status : 'error',
            message : 'cast not found'
        });
    }

    await cast.destroy();

    return res.json({
        status : 'success',
        message : 'cast has deleted'
    })
}