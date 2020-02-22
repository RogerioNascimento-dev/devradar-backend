const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, tecs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      try {
        const resApi = await axios.get(
          `https://api.github.com/users/${github_username}`
        );

        const tecsArray = parseStringAsArray(tecs);
        const { name = login, avatar_url, bio } = resApi.data;
        const location = {
          type: "Point",
          coordinates: [longitude, latitude]
        };
        dev = await Dev.create({
          name,
          github_username,
          avatar_url,
          bio,
          tecs: tecsArray,
          location
        });
      } catch (ex) {
        return res.status(404).json("Usuário não localizado");
      }
    }
    res.json(dev);
  },

  //lição implementar estes métodos
  async delete(req, res) {
    try {
      await Dev.remove({ _id: req.params.id });
      res.status(200).json("Excluido com sucesso!");
    } catch (ex) {
      res.status(401).json("Usuário Não localizado.");
    }
  }
};
