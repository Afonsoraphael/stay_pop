const { validationResult } = require("express-validator");
const { Location, UserHasLocation } = require("../models");

const LocationController = {
  Create: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(404).json(errors);
      }

      const userId = req.session.user.id;

      const locationToCreate = ({
        addressLine,
        postalCode,
        number,
        state,
        country,
      } = req.body);

      const locationCreated = await Location.create(locationToCreate).catch(
        (error) => {
          return res.status(500).json({ error: error.message });
        }
      );

      await UserHasLocation.create({
        userId,
        locationId: locationCreated.id,
      });

      return res.status(201).json(locationCreated);
    } catch (error) {
      console.log(error.message);
      return res.status(500).redirect("/");
    }
  },
};

module.exports = LocationController;
