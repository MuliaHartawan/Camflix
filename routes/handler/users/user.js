const {User} = require('../../../models');

module.exports = async(req, res) => {

    const user = req.user

    user.avatar =  user.avatar ? `${req.headers.host}/${user.avatar}` : null;

    return res.json({
        status : 'success',
        data : user
    })
}