const knex = require("../database/knex")


class TraumasController {
  async show(req, res) {
    const  {called_id}  = req.query

    const traumas = await knex("traumas")
      .where({ called_id })
      .groupBy("traumas_name")

    return res.json(traumas)
  }
}

module.exports = TraumasController