const knex = require("../database/knex")

class CalledController {
  async create(req, response) {

    const {
      type, victim_name, age, sexo, phone,
      rg, escortPhone, escortName,































      pa1, timePa1, pa2, timePa2,
      temperature, pulse, spo2,
      victim_destiny, descriptions,
      street, medicines,
      number,
      district,
      city,
      traumas,
      clinical,
      wound,
      procedures, used_material,
    } = req.body

    const user_id = req.user.id

    const called_id = await knex("called")
      .insert({
        type,
        victim_name,
        age,
        phone,
        rg,
        sexo,
        medicines,
        escortPhone,
        escortName,
        user_id
      })


    await knex("address").insert(
      {
        user_id,
        street,
        number,
        district,
        city,
        called_id,
      }
    )


    await knex("attendance")
      .insert({
        user_id, called_id, pa1, timePa1, pa2, timePa2,
        temperature, pulse, spo2, victim_destiny, descriptions
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


    const used_materialInsert = used_material.map(material => {
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
    console.log(id);
    const called = await knex("called")
      .where({ id }).first()
    const clinical = await knex("clinical")
      .where({ called_id: id })
      .orderBy("clinical_name")
    const traumas = await knex("traumas")
      .where({ called_id: id })
      .orderBy("traumas_name")
      

    return res.json({
      ...called,
      clinical,
      traumas
    })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("called")
      .where({ id })
      .delete()

    return response.json()
  }

  async index(request, response) {
    const { name, tags } = request.query
    const user_id = request.user.id

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex('tags')
        .select([
          'notes.id',
          'notes.name',
          'notes.user_id'
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.name', `%${name}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .groupBy('notes.id')
        .orderBy('notes.name');
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name")
    }

    const userTags = await knex('tags')
      .where({ user_id })

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags,
      }
    })

    return response.json(notesWithTags)

  }

}

module.exports = CalledController