const {User} = require('../../../models');

module.exports = async(req, res) => {

    const user = req.user

    user.avatar = `${req.get('host')}/${user.avatar}`

    return res.json({
        status : 'success',
        data : user
    })
}