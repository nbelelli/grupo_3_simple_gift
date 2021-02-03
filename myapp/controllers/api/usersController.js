/*const bcrypt = require('bcrypt');
const db = require('../../database/models');

const usersApiController=  {
    list: async (req, res)=>{
        const users= await db.users.findAll({
            attributes:['email', 'name','last_name']
        })

        res.json({
            meta:{
                status: "success", 
                count: users.length
            },
            data:{
                users,
            }
        })
    }
}