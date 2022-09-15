const knex = require("../database/knex")

class AddressController {
  async create(req, response) {

    const { street, number, district, city } = req.body

    const user_id = req.user.id
    const { called_id } = req.query

    await knex("address")
      .insert({ street, number, district, city, user_id, called_id })
      

    return response.json()
  }

  async update(req, res) {
    const { street, number, district, city } = req.body

    const { id } = req.params

    await knex("address").where({ id })
      .update({ street, number, district, city })

    return res.json()
  }



  async show(req, res) {
    const { id } = req.params

    const address = await knex("address")
      .where({ id })
      .first()

    return res.json({
      ...note
     
    })
  }


 

}

module.exports = AddressController