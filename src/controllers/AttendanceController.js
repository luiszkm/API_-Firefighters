const { json } = require("express")
const knex = require("../database/knex")

class AttendanceController {
  async create(req, res) {

    const {
      pa1, timePa1, pa2, timePa2,
      temperature, pulse, spo2,
       procedures , used_material,
       victim_destiny,descriptions,
    } = req.body

    const user_id = req.user.id
    //const { called_id } = req.query
    const called_id = await knex("called")
   
    


    await knex("attendance")
      .insert({ user_id, called_id, pa1, timePa1, pa2, timePa2,
        temperature, pulse, spo2, victim_destiny,descriptions})



        const proceduresInsert = procedures.map(procedures => {
          return {
            user_id,
            procedures_name:procedures,
            called_id,
          }
        })

        
        await knex("procedures").insert(proceduresInsert)

        
        const used_materialInsert = used_material.map(material => {
          return {
            user_id,
            material_name:material.name,
            material_amount:material.amount,
            called_id,
          }
        })
        
        await knex("used_material").insert(used_materialInsert)
    

    return res.json()
  }

  async update(req, res) {
    const { street, number, district, city } = req.body

    const { id } = req.params

    await knex("address").where({ id })
      .update({ street, number, district, city })

    return res.json()
  }


}

module.exports = AttendanceController