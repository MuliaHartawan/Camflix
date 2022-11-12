const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const Validator = require('fastest-validator');
const v = new Validator;

module.exports = async (req, res) => {

    const image = req.body.image || [];

    let filename;

    const schema = {
        name : 'string|empty:false',
        email : 'email|empty:false',
        password : 'string|min:6',
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate
        });
    }

    const user = await User.findOne({
        where : { email : req.body.email }
    });

    if(user) {
        return res.status(409).json({
            status : 'error',
            message : 'email already exist'
        });
    }

    if(image.length){

        if (!isBase64(image, {mimeRequired: true})) {
            return res.status(400).json({status : 'error', message : "invalid base64"});
        }
    
        base64Img.img(image, './public/images/users', Date.now(), async (err, filepath) => {
        if(err){
          return res.status(400).json({ status : 'error', message : err.message });
        }

        filename = filepath.split("\\").pop().split("/").pop();
    
        });
    
    }

    const password = await bcrypt.hash(req.body.password, 10)

    const data = {
        name : req.body.name,
        avatar : 'images/users/' + filename,
        password,
        email : req.body.email,

    }

    const createUser = await User.create(data);

    return res.json({
        status : 'success',
        data: {
            id : createUser.id
        }
    })
}