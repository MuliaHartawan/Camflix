const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const Validator = require('fastest-validator');
const v = new Validator;
const fs = require('fs');

module.exports = async (req, res) => {

    const image = req.body.image || [] ;

    let filename

    const schema = {
        name : 'string|empty:false',
        email : 'email|empty:false',
        password : 'string|min:6',
        avatar : 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if(validate.length) {
        return res.status(400).json({
            status : 'error',
            message : validate
        });
    }

    const id = req.user;
    const user = await User.findByPk(id.id);
    if(!user){
        return res.status(404).json({
            status : 'error',
            message : 'user not found'
        });
    }
    
    const email = req.body.email;
    if(email){
        const checkEmail = await User.findOne({
            where : {email: req.body.email}
        });

        if (checkEmail && email === user.email){
            return res.status(409).json({
                status : 'error',
                message : 'Email already exist'
            });
        }
    }

    if(image.length){

        if (!isBase64(image, {mimeRequired: true})) {
            return res.status(400).json({status : 'error', message : "invalid base64"});
        }

        if (user.avatar) {
            fs.unlink(`./public/${user.avatar}`, async (err) => {
                if(err){
                  return res.status(400).json({status : 'error', message : err.message});
                }
            });
        }
    
        base64Img.img(image, './public/images/users', Date.now(), async (err, filepath) => {
        if(err){
          return res.status(400).json({ status : 'error', message : err.message });
        }
    
        filename = filepath.split("\\").pop().split("/").pop();
    
        });
    
    }

    const password = await bcrypt.hash(req.body.password, 10);

    data =  {
        name : req.body.name, 
        avatar : 'images/users/' + filename,
        email : req.body.email,
        password : password
    }

    const updateUser = await user.save(data);

    return res.json({
        status : 'success',
        data : {
            id : updateUser.id,
            name : updateUser.name,
            email : updateUser.email,
            avatar : `${req.headers.host}/${updateUser.avatar}`
        }
    });
}