const {Cast} = require('../../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const Validator = require('fastest-validator');
const moment = require('moment');
const v = new Validator;
const fs = require('fs');

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

    const id = req.params.id;
    const cast = await Cast.findByPk(id);
    if(!cast){
        return res.status(404).json({
            status : 'error',
            message : 'cast not found'
        });
    }

    if(image.length){

        if (!isBase64(image, {mimeRequired: true})) {
            return res.status(400).json({status : 'error', message : "invalid base64"});
        }

        nameExtension = image.split('/')[1].split(';')[0];

        nameExtension == 'jpeg' ? nameExtension = 'jpg' : nameExtension

        fs.unlink(`./public/${cast.avatar}`, async (err) => {
            if(err){
              return res.status(400).json({status : 'error', message : err.message});
            }
        });
    
        base64Img.img(image, './public/images/cast', filename, async (err, filepath) => {
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

    const updateCast = await cast.update(data);

    return res.json({
        status : 'success',
        data : {
            id : updateCast.id,
            name : updateCast.name,
            avatar : `${req.headers.host}${updateCast.avatar}`,
            birthday: updateCast.birthday,
            deadday: updateCast.deadday,
            rating : updateCast.rating
        }
    })
}