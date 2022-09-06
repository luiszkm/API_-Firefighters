const knex = require("../database/knex")

class CalledController {
  async create(req, response) {

    const {
      type, victim_name, age, sexo, phone,
      rg, escortPhone, escortName,
      medicines, traumas, clinical, wound
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
        wound_name:wound.name,
        wound_local:wound.local,
        called_id,
      }
    })

    await knex("wound").insert(woundsInsert)


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

  async show(request, response) {
    const { id } = request.params

    const note = await knex("called")
      .where({ id }).first()
    const tags = await knex("tags")
      .where({ note_id: id })
      .orderBy("name")
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at")

    return response.json({
      ...note,
      tags,
      links
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