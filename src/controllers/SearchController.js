const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, tecs } = req.query;

    const tecsArray = parseStringAsArray(tecs);

    const devs = await Dev.find({
      tecs: {
        $in: tecsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    return res.json({ devs });
  }
};
