const knex = require("../database/knex")


class  AdmController{

  async show(req, res) {
    
    const called = await knex("called")
   

    return res.json({called})
  }


}

module.exports = AdmController