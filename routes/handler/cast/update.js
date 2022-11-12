const {Cast} = require('../../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const Validator = require('fastest-validator');
const v = new Validator;
const fs = require('fs');

module.exports = async(req, res) => {
    
    const image = req.body.image || [] ;

    let filename

    const schema = {
        name : 'string|empty:false',
        birthday : 'date',
        deadday : 'optional',
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

        fs.unlink(`./public/${cast.poster}`, async (err) => {
            if(err){
              return res.status(400).json({status : 'error', message : err.message});
            }
        });
    
        base64Img.img(image, './public/images/cast', Date.now(), async (err, filepath) => {
        if(err){
          return res.status(400).json({ status : 'error', message : err.message });
        }
    
        filename = filepath.split("\\").pop().split("/").pop();
    
        });
    
    }

    data = {
        name : req.body.name,
        avatar : filename,
        birthday : new Date(req.body.birthday),
        deadday : new Date(req.body.deadday) || null,
        rating : req.body.deadday
    }

    const updateCast = await Cast.update(data);

    return res.json({
        status : 'success',
        data : {
            id : updateCast.id,
            name : updateCast.name,
            avatar : updateCast.avatar,
            birthday: updateCast.birthday,
            deadday: updateCast.deadday,
            rating : updateCast.rating
        }
    })
}