const { body } = require('express-validator')
const { Location } = require('../models')


  const validateFinishOrder = [
    body('locationId').custom(async (value, { req }) => {
      if(!value) {
        const locations = await Location.findAll({
          include: [
            {
              association: 'users',
              where: {
                id: req.session.user.id
              },
              required: true
            }
          ]
        })
        
        if(locations.length === 0) {
          throw new Error('User not have any locations')
        }

        return true
      }
    })
  ];
  
module.exports = validateFinishOrder;