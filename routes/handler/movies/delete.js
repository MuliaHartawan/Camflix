const {Movies} = require('../../../models');

module.exports = async(req, res) => {
    const id = req.params.id;

    const movie = await Movies.findByPk(id);

    if(!movie){
        return res.status(404).json({
            status : 'error',
            message : 'movie not found'
        });
    }

    await movie.destroy();

    return res.json({
        status : 'success',
        message : 'movie has deleted'
    })
}