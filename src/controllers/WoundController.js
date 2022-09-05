const knex = require("../database/knex")


class ClinicalController {
  async index(req, res) {
    const  {called_id}  = req.query

    const wound = await knex("wound")
      .where({ called_id })
      .groupBy("wound_name")

    return res.json(wound)
  }
}

module.exports = ClinicalController