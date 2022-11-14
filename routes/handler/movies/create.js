const {Movies} = require('../../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = async(req, res) => {
    
    const image = req.body.image || [] ;
    
    let filename = Date.now();

    let nameExtension;

    const schema = {
        name : 'string|empty:false',
        status :  { 
            type : "enum",
            values : ["ongoing","started","ended"]
        },
        rating : 'number',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate.map(v => {
                return {
                  message: v.message
                }
            })
        });
    }

    if(image.length){

        if (!isBase64(image, {mimeRequired: true})) {
            return res.status(400).json({status : 'error', message : "invalid base64"});
        }

        nameExtension = image.split('/')[1].split(';')[0];

        nameExtension == 'jpeg' ? nameExtension = 'jpg' : nameExtension
        
        base64Img.img(image, './public/images/movie', filename, async (err, filepath) => {
        if(err){
          return res.status(400).json({ status : 'error', message : err.message });
        }
    
    });
    
    }   

    data = {
        name : req.body.name,
        poster : '/images/movie/' + filename + '.' + nameExtension,
        status : req.body.status,
        rating : req.body.rating
    }
    
    const createMovie = await Movies.create(data);

    return res.json({
        status : 'success',
        data : {
            id : createMovie.id
        }
    })
}