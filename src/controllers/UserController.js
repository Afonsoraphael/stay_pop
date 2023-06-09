const bcrypt = require("bcryptjs");
const { User, Op } = require("../models");
const { validationResult } = require("express-validator");

const UserController = {
  Get: async (req, res) => {
    try {
      const id = req.params.id;

      if (Number(id) !== req.session.user.id) {
        return res.status(401).json({ error: "Page not found" });
      }

      const user = await User.findByPk(
        id,
        {
          include: [
            {
              association: "locations",
            },
          ],
          attributes: {
            exclude: ["password"],
          },
        },
        { raw: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  },

  Create: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(404).json(errors);
      }

      const { name, email, password } = req.body;

      const newUser = {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      };
      try {
        const userCreated = await User.create(newUser, { raw: true });

        const userCreatedWithoutPassword = new User({
          id: userCreated.id,
          name: userCreated.name,
          email: userCreated.email,
        });

        return res.json(userCreatedWithoutPassword);
      } catch (error) {
        return res.json({ error: error.message });
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  },

  Update: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(404).json(errors);
      }

      const id = req.params.id;

      if (id !== req.session.user.id) {
        return res.status(401).json({ error: "Page not found" });
      }

      const userToUpdate = ({ name, email, password } = req.body);

      const validateIfEmailAlreadyExists = await User.findOne({
        where: {
          email: email,
          id: {
            [Op.ne]: [id],
          },
        },
      });

      if (validateIfEmailAlreadyExists) {
        return res.status(404).json({ error: "Email already exists" });
      }

      try {
        const userUpdated = await User.update(userToUpdate, {
          where: {
            id,
          },
        });

        if (userUpdated.length)
          return res.status(200).json({ success: "Updated successfully" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  },

  Delete: async (req, res) => {
    try {
      const id = req.params.id;

      if (id !== req.session.user.id) {
        return res.status(404).json({ error: "Page not found" });
      }
      try {
        await User.delete({
          where: {
            id,
          },
        });

        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/");
    }
  },
};

module.exports = UserController;
