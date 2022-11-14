const {Cast} = require('../../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const Validator = require('fastest-validator');
const moment = require('moment');
const v = new Validator;

module.exports = async(req, res) => {
    
    const image = req.body.image || [] ;

    let filename = Date.now();

    let nameExtension;

    const schema = {
        name : 'string|empty:false',
        birthday : 'string',
        deadday : 'string|optional',
        rating : 'number'
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate
        });
    }

    if(image.length){

        if (!isBase64(image, {mimeRequired: true})) {
            return res.status(400).json({status : 'error', message : "invalid base64"});
        }

        nameExtension = image.split('/')[1].split(';')[0];

        nameExtension == 'jpeg' ? nameExtension = 'jpg' : nameExtension
    
        base64Img.img(image, './public/images/cast', Date.now(), async (err, filepath) => {
        if(err){
          return res.status(400).json({ status : 'error', message : err.message });
        }
    
        });
    
    }

    data = {
        name : req.body.name,
        avatar : '/images/cast/' + filename + '.' + nameExtension,
        birthday : moment(req.body.birthday).format('DD-MM-YYYY'),
        deadday : moment(req.body.deadday).format('DD-MM-YYYY') || null,
        rating : req.body.deadday
    }

    const createMovie = await Cast.create(data);

    return res.json({
        status : 'success',
        data : {
            id : createMovie.id
        }
    })
}