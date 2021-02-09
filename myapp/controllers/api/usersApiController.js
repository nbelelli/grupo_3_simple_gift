const { User } = require('../../database/models');

const usersApiController = {
    async list (req, res) {
        try{
            const users = await User.findAll({
                attributes: ['email', 'password']
            })

            // meta
            res.json({
                meta: {
                    status: 200,
                    count: users.length,
                    url: "/api/users"
                },
                data: {
                    users,
                }
            })
        } catch(error) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'User not found',
            })
        }
    }
};

module.exports = usersApiController;
