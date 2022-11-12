const {User} = require('../../../models');

module.exports = async(req, res) => {

    const user = req.user

    return res.json({
        status : 'success',
        data : user
    })
}