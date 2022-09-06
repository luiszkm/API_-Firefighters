const knex = require("../database/knex")


class UsedMaterialController {
  async index(req, res) {
    const  {called_id}  = req.query

    const used_material = await knex("used_material")
      .where({ called_id })
      .groupBy("material_name")

    return res.json(used_material)
  }
}

module.exports = UsedMaterialController