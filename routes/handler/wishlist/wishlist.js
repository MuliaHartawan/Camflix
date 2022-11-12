const {Wishlist} = require('../../../models');

module.exports = async(req, res) => {

    const id = req.user.user.id

    console.log(id);

    const wishlist = await Wishlist.findAll({
        where : {
            user_id : id
        },
        attributes : ['id', 'like', 'movie_id', 'user_id']
    });

    if(!wishlist){
        return res.status(404).json({
            status : 'error',
            message : 'wishlist not found'
        });
    }

    return res.json({
        status : 'success', 
        data : wishlist
    })
}