const {Movies} = require('../../../models');

module.exports = async(req, res) => {
    const id = req.params.id;

    const movie = await Movies.findByPk(id, {
        attributes : ['id', 'name', 'poster', 'status', 'rating']
    });

    if(!movie){
        return res.status(404).json({
            status : 'error',
            message : 'movie not found'
        });
    }

    return res.json({
        status : 'success',
        data : movie
    })
}