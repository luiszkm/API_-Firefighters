const knex = require("../database/knex")


class ProceduresController {
  async index(req, res) {
    const  {called_id}  = req.query

    const procedures = await knex("procedures")
      .where({ called_id })
      .groupBy("procedures_name")

    return res.json(procedures)
  }
}

module.exports = ProceduresController