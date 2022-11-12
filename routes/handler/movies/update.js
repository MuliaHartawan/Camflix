const {Movies} = require('../../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = async(req, res) => {
    
    const image = req.body.image || [] ;

    let filename

    const schema = {
        name : 'string|empty:false',
        status : 'enum:["ongoing","started","ended"]',
        rating : 'number',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate
        });
    }

    const id = req.params.id;
    const movie = await Movies.findByPk(id);
    if(!movie){
        return res.status(404).json({
            status : 'error',
            message : 'movie not found'
        });
    }

    if(image.length){

        if (!isBase64(image, {mimeRequired: true})) {
            return res.status(400).json({status : 'error', message : "invalid base64"});
        }

        fs.unlink(`./public/${movie.poster}`, async (err) => {
            if(err){
              return res.status(400).json({status : 'error', message : err.message});
            }
        });
    
        base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
        if(err){
          return res.status(400).json({ status : 'error', message : err.message });
        }
    
        filename = filepath.split("\\").pop().split("/").pop();
    
        });
    
    }

    data = {
        name : req.body.name,
        poster : filename,
        status : req.body.status,
        rating : req.body.rating
    }

    const updateMovie = await Movies.update(data);

    return res.json({
        status : 'success',
        data : {
            id : updateMovie.id,
            name : updateMovie.name,
            poster : updateMovie.poster,
            status: updateMovie.status,
            rating : updateMovie.rating
        }
    })
}