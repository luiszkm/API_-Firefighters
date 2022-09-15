const knex = require("../database/knex")

class CalledController {

  async create(req, response) {

    const {
      type, victimName, age, sexo, phone,
      rg, escortPhone, escortName,
      pa1, timePa1, pa2, timePa2,
      temperature, pulse, spo2,
      victimDestiny, descriptions,
      street, medicines,
      number,
      district,
      city,
      traumas,
      clinical,
      wound,
      procedures, usedMaterial,
      userName
    } = req.body

    const user_id = req.user.id

    let today = new Date();
    const now = today.toLocaleString();


    const called_id = await knex("called")
      .insert({
        type,
        victim_name: victimName,
        age,
        phone,
        rg,
        sexo,
        medicines,
        escortPhone,
        escortName,
        user_id,
        user_name:userName,
        created_at: now
      })


    await knex("address").insert(
      {
        user_id,
        street,
        number,
        district,
        city,
        called_id,
        created_at: now

      }
    )


    await knex("attendance")
      .insert({
        user_id, called_id, pa1, timePa1, pa2, timePa2,
        temperature, pulse, spo2, victim_destiny: victimDestiny, descriptions
        , created_at: now

      })

    const clinicalInsert = clinical.map(clinical_name => {
      return {
        user_id,
        clinical_name,
        called_id,
      }
    })

    await knex("clinical").insert(clinicalInsert)


    const traumasInsert = traumas.map(traumas_name => {
      return {
        user_id,
        traumas_name,
        called_id,
      }
    })

    await knex("traumas").insert(traumasInsert)

    const woundsInsert = wound.map(wound => {
      return {
        user_id,
        wound_name: wound.name,
        wound_local: wound.local,
        called_id,
      }
    })

    await knex("wound").insert(woundsInsert)

    const proceduresInsert = procedures.map(procedures => {
      return {
        user_id,
        procedures_name: procedures,
        called_id,
      }
    })


    await knex("procedures").insert(proceduresInsert)


    const used_materialInsert = usedMaterial.map(material => {
      return {
        user_id,
        material_name: material.name,
        material_amount: material.amount,
        called_id,
      }
    })

    await knex("used_material").insert(used_materialInsert)

    return response.json()
  }

  async update(request, response) {
    const { victim_name, age, sexo, phone, rg, escortPhone, escortName } = request.body

    const { id } = request.params

    const called = await knex("called").where({ id })
      .update({
        victim_name,
        age,
        phone,
        rg,
        sexo,
        escortPhone,
        escortName,
      })

    return response.json()
  }

  async show(req, res) {
    const { id } = req.params


   

    const called = await knex("called")
      .where({ id })
      .first()
    const clinical = await knex("clinical")
      .where({ called_id: id })
      .orderBy("clinical_name")
    const traumas = await knex("traumas")
      .where({ called_id: id })
      .orderBy("traumas_name")


    return res.json({
      ...called,
      clinical,
      traumas,
      
    })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("called")
      .where({ id })
      .delete()

    return response.json()
  }

  async index(req, res) {

    const user_id = req.user.id
    const { victim_name } = req.query
    const { rg } = req.query

    const called = await knex("called")
      .where({ user_id })
      .whereLike("victim_name ", `%${victim_name}%`)
      .whereLike("rg ", `%${rg}%`)
      .orderBy("victim_name")


    return res.json(called)

  }

}

module.exports = CalledController