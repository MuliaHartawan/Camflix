const {Wishlist} = require('../../../models');

module.exports = async(req, res) => {
    const id = req.params.id;

    const wishlist = await Wishlist.findByPk(id);

    if(!wishlist){
        return res.status(404).json({
            status : 'error',
            message : 'wishlist not found'
        });
    }

    await cast.destroy();

    return res.json({
        status : 'success',
        message : 'Wishlist has deleted'
    })
}