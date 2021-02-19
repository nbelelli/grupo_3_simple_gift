const { User } = require("../../database/models");

const usersApiController = {
  async list(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
      });

      // meta
      res.json({
        meta: {
          status: 200,
          count: users.length,
          url: "/api/users",
        },
        data: {
          users,
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "User not found",
      });
    }
  },  
  async findUser (req, res){
    const { id } = req.params
    try {
      const user = await User.findByPk(id,({
        attributes: ["id", "name", "email", "avatar", "phone", "address"]
      }))

      // meta
      res.json({
        meta: {
          status: "success",
        },
        data: {
          user,
        }
      })
    } catch (error) {
      console.log(error, "error encontrado")
      res.status(500).json({
        meta: {
          status: "error",
        },
        error: "User not found",
      })
    }
  }
};

module.exports = usersApiController;
