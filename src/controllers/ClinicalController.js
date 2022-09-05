const knex = require("../database/knex")


class ClinicalController {
  async index(req, res) {
    const  {called_id}  = req.query

    const clinical = await knex("clinical")
      .where({ called_id })
      .groupBy("clinical_name")

    return res.json(clinical)
  }
}

module.exports = ClinicalController