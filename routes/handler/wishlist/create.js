const {Wishlist, Movies} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = async(req, res) => {

    const schema = {
        like : 'boolean|empty:false',
        movie_id : 'number|empty:false',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate
        });
    }

    const movie = await Movies.findByPk(movie_id);

    if(!movie){
        return res.status(404).json({
            status : 'error',
            message : 'Movie not found, Please check again!'
        });
    }

    data = {
        like,
        user_id : req.user.id,
        movie_id
    }
    
    const createWishlist = await Wishlist.create(data);

    return res.json({
        status : 'success',
        data : {
            id : createWishlist.id
        }
    })
}